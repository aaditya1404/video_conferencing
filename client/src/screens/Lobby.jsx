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



// import React, { useState, useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "../context/SocketProvider";
// import { Box, styled, TextField, Button } from '@mui/material'
// // import './Lobby.css'




// const LobbyScreen = () => {

//     const Component = styled(Box)`
// width: 400px;

// margin: auto;
// box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.7)

// `
//     const Wrapper = styled(Box)`
// padding: 25px 35px;
// display: flex;
// flex: 1;
// flex-direction:column;
// &>div, &>button, &>p {
//     margin-top: 20px;
// }`
//     const JoinButton = styled(Button)`

// text-transform :none;
// background:orange;
// color: #fff;
// height: 48px;

// border-radius: 2px;
// `

//     const [email, setEmail] = useState("");
//     const [room, setRoom] = useState("");

//     const socket = useSocket();
//     const navigate = useNavigate();

//     const handleSubmitForm = useCallback(
//         (e) => {
//             e.preventDefault();
//             console.log(email);
//             console.log(room);
//             socket.emit("room:join", { email, room });
//         },
//         [email, room, socket]
//         // [email, room]
//     );

//     const handleJoinRoom = useCallback(
//         (data) => {
//             const { email, room } = data;
//             navigate(`/room/${room}`);
//         },
//         [navigate]
//     );

//     useEffect(() => {
//         socket.on("room:join", handleJoinRoom);
//         return () => {
//             socket.off("room:join", handleJoinRoom);
//         };
//     }, [socket, handleJoinRoom]);

//     return (
//         // <Component>
//         //     <Box>
//         // {
//         <div className="main">

//             <div>
//                 <h1>Lobby</h1>
//                 <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="label"
//                     placeholder="Enter your Email"
//                 />
//                 <br />
//                 {/* <TextField variant="standard" label="enter room number" */}

//                 < input
//                     type="text"
//                     id="room"
//                     value={room}
//                     onChange={(e) => setRoom(e.target.value)}
//                     className="label"
//                     placeholder="Enter your room number"
//                 />
//                 <br />
//                 <button >Join</button>
//             </div>
//         </div>
//         // }
//         /* </Box>
//     </Component> */
//     )
// };

// export default LobbyScreen;