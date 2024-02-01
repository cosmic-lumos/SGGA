import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { StompSessionProvider, useSubscription, useStompClient } from "react-stomp-hooks";

const RoomInfo = (props) => {
    const { code }=useParams();

    return (       
        <StompSessionProvider
            url={'ws://localhost:8080/sgga-websocket'}>
            <Information code={code}/>
        </StompSessionProvider>
    )
}

const Information = (props) => {
    const [info, setInfo] = useState(null);

    const stompClient = useStompClient();

    const sendMessage = () => {
        if(stompClient){
            stompClient.publish({
                destination: `/app/${props.code}/join`,
                body: JSON.stringify({'name': "꽃뱀"})
            })
        }
    }

    useEffect(()=>{
        console.log(info);
    }, [info])

    useSubscription("/room/"+props.code, (roomDto) => {
        setInfo(JSON.parse(roomDto.body));
    });
    return (
        <div>
            {props.code}
            <button onClick={sendMessage}>눌러봐</button>
        </div>
    )
}

export default RoomInfo;