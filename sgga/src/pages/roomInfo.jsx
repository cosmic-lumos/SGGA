import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { StompSessionProvider, useSubscription, useStompClient } from "react-stomp-hooks";
import { Container, Row, Col, Form, Button, Spinner, Table, ListGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const RoomInfo = (props) => {
    const [spinnerMode, setSpinnerMode] = useState("border");
    const { code } = useParams();

    return (
        <StompSessionProvider
            onConnect={() => {
                setSpinnerMode("");
            }}
            url={'ws://localhost:8080/sgga-websocket'}>
            <Container>
                <Spinner animation={spinnerMode} role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <Information name={props.userName} code={code} hidden={spinnerMode === "border"} />
            </Container>
        </StompSessionProvider>
    )
}

const Information = (props) => {
    const [info, setInfo] = useState(null);
    const [name, setName] = useState(props.name ? props.name : "기본이름");
    const stompClient = useStompClient();

    const enterRoom = () => {
        if (stompClient) {
            stompClient.publish({
                destination: `/app/${props.code}/join`,
                body: JSON.stringify({ 'name': name })
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
        <div hidden={props.hidden}>
            <Row>
                <Col xs={10}>
                    <h1>
                        {name}
                    </h1>
                </Col>
                <Col xs={2}>
                    <p className="text-end">
                        입장코드
                        {props.code}
                    </p>
                </Col>
                <button onClick={enterRoom}>눌러봐</button>
            </Row>
            <Row>
                <Col xs={2}>
                    <UserList info={info}></UserList>
                </Col>
            </Row>
        </div>
    )
}

const UserList = (props) => {
    if (props.info == null) {
        return;
    }
    return (
        <ListGroup as="ul">
            {
                props.info.users.map((value, index) => {
                    return (
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            key={index}>
                            <div className="fw-bold">{value.name}</div>
                        </ListGroup.Item>
                    );
                })}
        </ListGroup>
    );
}

const SeatTable = (props) => {
    const size = props.size ? props.size : 4;

    const makeSeat = () => {
        return <tr></tr>
    }

    return (
        <Table responsive>
            <tbody>
                {makeSeat()}
            </tbody>
        </Table>
    )
}

export default RoomInfo;