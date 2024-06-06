import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import './Lobby.css';


const LobbyScreen = () => {

    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");

    const socket = useSocket();
    const navigate = useNavigate();

    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            console.log(email);
            console.log(room);
            socket.emit("room:join", { email, room });
        },
        [email, room, socket]
        // [email, room]
    );

    const handleJoinRoom = useCallback(
        (data) => {
            const { email, room } = data;
            navigate(`/room/${room}`);
        },
        [navigate]
    );

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
            socket.off("room:join", handleJoinRoom);
        };
    }, [socket, handleJoinRoom]);

    return (
        <div className="main">
            <div className="heading">
                <p >Lobby</p>
            </div>
            <form onSubmit={handleSubmitForm} >
                <div className="email">
                    <label htmlFor="email" >Email ID</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="label"
                        placeholder="Enter your Email"
                    />
                </div>
                <div className="room">
                    <label htmlFor="room">Room Number</label>
                    <input
                        type="text"
                        id="room"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        className="label2"
                        placeholder="Enter your room number"
                    />
                </div>
                <div className="btn">
                    <button>Join</button>
                </div>
            </form>
        </div>
    );
};

export default LobbyScreen;

