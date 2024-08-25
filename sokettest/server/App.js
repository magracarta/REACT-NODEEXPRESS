const WebSocket = require('ws');
const http = require('http');
const mysql = require('mysql2');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wssRoomList = new WebSocket.Server({ noServer: true });
const wssChat = new WebSocket.Server({ noServer: true });

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adminuser',
    database: 'chattest'
});

let chatroom = []; // 채팅방 목록
const roomClients = {}; // 채팅방 별 클라이언트 목록

// 채팅방 목록 로드
function loadChatRooms() {
    connection.query(`SELECT cr.cseq, cr.f_id, cr.t_id, user.name AS f_user_name,
        cr.subject, cr.status, cr.time FROM chatroom cr LEFT JOIN user ON cr.f_id = user.id`, 
        (err, result) => {
            if (err) return console.error(err);
            chatroom = result.map(item => ({
                id: item.cseq,
                f_id: item.f_id,
                t_id: item.t_id,
                subject: item.subject,
                userid: item.f_user_name,
                status: item.status,
                time: item.time
            }));
        });
}

loadChatRooms();

// 채팅방 목록 WebSocket 서버
wssRoomList.on('connection', (ws) => {
    console.log('Room list WebSocket connection established');
    ws.send(JSON.stringify({ type: 'roomList', rooms: chatroom }));
});

// 채팅 WebSocket 서버
wssChat.on('connection', (ws, request) => {
    const room = request.url.replace('/chat/', '');
    console.log(`New client connected to chat room: ${room}`);

    if (!roomClients[room]) {
        roomClients[room] = [];
    }
    roomClients[room].push(ws);

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(`${room}: ${message}`);

        let mseq= null;
        let mdata = null;

        // 메시지를 데이터베이스에 저장
        connection.query("INSERT INTO message (cseq, is_fid, content) VALUES (?, ?, ?)",
        [room, data.is_fid, data.content], (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            mseq = result.insertId;

             // 모든 클라이언트에게 메시지 전송
             roomClients[room].forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    // 데이터베이스에서 새로 저장된 메시지를 조회
                    connection.query("SELECT * FROM message WHERE mseq = ?", [result.insertId], (err, rows) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        // 메시지 데이터 전송
                        client.send(JSON.stringify({ type: 'newMessage', mdata: rows[0] }));
                    });
                }
            });
        });


       
    });

    ws.on('close', () => {
        roomClients[room] = roomClients[room].filter(client => client !== ws);
    });
});

app.post('/createRoom', (req, res) => {
    const { f_id, t_id, subject } = req.body;
    connection.query("INSERT INTO chatroom (f_id, t_id, subject, status) VALUES (?, ?, ?, ?)",
        [f_id, t_id, subject, 0], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
                return;
            }
            const room = {
                id: result.insertId,
                f_id,
                t_id,
                subject,
                status: 0,
                time: new Date().toISOString() // ISO 8601 형식으로 변환
            };
            chatroom.push(room);

            // 모든 클라이언트에게 방 목록 전송
            wssRoomList.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'roomList', rooms: chatroom }));
                }
            });
            res.json(room);
        });
});

app.get('/chattingList/:cseq', (req, res) => {
    const cseq = req.params.cseq;
    connection.query("SELECT * FROM message WHERE cseq = ?", [cseq], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
        }
        res.json(result);
    });
});

server.on('upgrade', (request, socket, head) => {
    if (request.url === '/rooms') {
        wssRoomList.handleUpgrade(request, socket, head, (ws) => {
            wssRoomList.emit('connection', ws, request);
        });
    } else if (request.url.startsWith('/chat/')) {
        wssChat.handleUpgrade(request, socket, head, (ws) => {
            wssChat.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

let member = require('./Router/Member');
app.use('/member', member);

server.listen(3000, () => {
    console.log('WebSocket server is running on ws://localhost:3000');
});
