import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Chatroom() {
    const user = useSelector(state => state.user);
    const [rooms, setRooms] = useState([]);
    const [subject, setSubject] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const roomListSocket = new WebSocket('ws://localhost:3000/rooms');
        roomListSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'roomList') {
                console.log(data.rooms);
                setRooms(data.rooms);
            }
        };
        return () => {
            roomListSocket.close();
        };
    }, []);
    const createRoom = async () => {
        try {
            const response = await axios.post('http://localhost:3000/createRoom', {
                f_id: user.id,
                t_id: 1, // Example t_id, this should be dynamic
                subject
            });
            setRooms(prevRooms => [...prevRooms, response.data]);
            setSubject('');
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    return (
        <div>
            <h1>Chat Rooms</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room} onClick={() => {
                        navigate(`/chatting/${room.id}`);
                    }}>{room.id} : {room.subject} - {room.userid}</li>
                ))}
            </ul>
            {
                (user.id !== 1)?(
                    <>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="New Room Subject"
                    />
                    <button onClick={createRoom}>Create Room</button>
                    </>
                ):(null)
            }
            
        </div>
    );
}

export default Chatroom
