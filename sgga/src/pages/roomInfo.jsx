import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { StompSessionProvider, useSubscription, useStompClient } from "react-stomp-hooks";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const RoomInfo = (props) => {
    const [spinnerMode, setSpinnerMode] = useState("border");
    const { code } = useParams();

    return (
        <StompSessionProvider
            onConnect={()=>{
                setSpinnerMode("");
            }}
            url={'ws://localhost:8080/sgga-websocket'}>
                <Container>
                    <Spinner animation={spinnerMode} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <Information code={code} hidden={spinnerMode === "border"}/>
                </Container>
        </StompSessionProvider>
    )
}

const Information = (props) => {
    const [info, setInfo] = useState(null);

    const stompClient = useStompClient();

    const sendMessage = () => {
        if (stompClient) {
            stompClient.publish({
                destination: `/app/${props.code}/join`,
                body: JSON.stringify({ 'name': "꽃뱀" })
            })
        }
    }

    useEffect(() => {
        console.log(info);
    }, [info])

    useSubscription("/room/" + props.code, (roomDto) => {
        setInfo(JSON.parse(roomDto.body));
    });
    return (
        <Row hidden={props.hidden}>
            {props.code}
            <button onClick={sendMessage}>눌러봐</button>
        </Row>
    )
}

export default RoomInfo;