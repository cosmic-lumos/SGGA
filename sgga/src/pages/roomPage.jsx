import React, { useState } from "react";
import {useNavigate } from "react-router-dom";


const RoomPage = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const onChangeRandomCode = (e) => {
        setCode(e.target.value);
    }

    const onClickSubmit = () => {
        if(code === ""){
            return;
        }
        navigate(`/room/${code}`);
    }

    return (
        <div>
            <input type="text" onChange={onChangeRandomCode}/>
            <button onClick={onClickSubmit}>입장</button>
            <p>{code}</p>
            
        </div>
    )
}

export default RoomPage;