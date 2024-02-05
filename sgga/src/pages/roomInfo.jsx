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
                    <Information name={props.userName} code={code} hidden={spinnerMode === "border"}/>
                </Container>
        </StompSessionProvider>
    )
}

const Information = (props) => {
    const [info, setInfo] = useState(null);
    const [name, setName] = useState(props.name ? props.name : "기본이름");
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
            <Col xs={10}>
                <h1 style={{height: "100%" }}>
                    {name}
                </h1>
            </Col>
            <Col xs={2}>
                <p className="text-end">
                    입장코드
                    {props.code}
                </p>
            </Col>
            <button onClick={sendMessage}>눌러봐</button>
        </Row>
    )
}

export default RoomInfo;