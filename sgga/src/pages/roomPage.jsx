import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const RoomPage = () => {
    const [validated, setValidated] = useState(false);
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const onChangeRandomCode = (e) => {
        setCode(e.target.value);
    }

    const onClickSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }
        navigate(`/room/${code}`);
    }

    return (
        <Container >
            <Row>
                <div>
                    <Form noValidate validated={validated} onSubmit={onClickSubmit}>
                        <Form.Label htmlFor="roomCode">방 입장코드</Form.Label>
                        <Form.Control
                            type="text"
                            id="roomCode"
                            aria-describedby="roomCodeHelpBlock"
                            required
                            onChange={onChangeRandomCode}
                        />
                        <Form.Control.Feedback type="invalid">입장코드를 입력해 주세요.</Form.Control.Feedback>
                        <Form.Text as="p" id="roomCodeHelpBlock" muted>
                            방 생성시 주어지는 랜덤 코드를 입력하세요.
                        </Form.Text>
                        <Button type="submit" variant="primary">입장</Button>
                    </Form>
                </div>
            </Row>

        </Container>
    )
}

export default RoomPage;