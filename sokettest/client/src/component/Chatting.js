import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Chatting() {
    const { cseq } = useParams(); // 채팅방 ID
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const user = useSelector(state => state.user);
    const ws = useRef(null);

    useEffect(() => {
        // HTTP GET 요청으로 채팅 목록을 불러옵니다.
        axios.get(`http://localhost:3000/chattingList/${cseq}`)
            .then((result) => {
                // 메시지 데이터를 상태에 저장합니다.
                setMessages(result.data);
            })
            .catch(err => {
                console.error(err);
            });

        // 웹소켓 연결
        ws.current = new WebSocket(`ws://localhost:3000/chat/${cseq}`);

        ws.current.onopen = () => {
            console.log('WebSocket connected to room:', cseq);
        };

        ws.current.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            console.log(parsedData);
            if (parsedData.type === 'newMessage') {
                // 새로운 메시지를 상태에 추가합니다.
                setMessages((prevMessages) => [...prevMessages, parsedData.mdata]);
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected from room:', cseq);
        };

        return () => {
            ws.current.close();
        };
    }, [cseq]);

    const sendMessage = () => {
        if (ws.current && message.trim()) {
            let isFid = 0;
            if (user.id !== 1) isFid = 1;
            const data = { content: message, is_fid: isFid }; // Assuming current user is f_id
            ws.current.send(JSON.stringify(data));
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Chat Room: {cseq}</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.is_fid ? 'user' : 'admin'}:</strong> {msg.content}
                        <br />
                        <small>{new Date(msg.time).toLocaleString()}</small>
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chatting;
