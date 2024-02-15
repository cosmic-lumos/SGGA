import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/roomPage.css";

const RoomPage = () => {
  const location = useLocation();
  const userInfo = { ...location.state };
  const [validated, setValidated] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const onChangeRandomCode = (e) => {
    setCode(e.target.value);
  };

  const onClickSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    navigate(`/room/${code}`, { state: { ...userInfo } });
  };

  return (
    <Container className="h-100 d-flex align-items-center justify-content-center">
      <Row>
        <div>
          <Form noValidate validated={validated} onSubmit={onClickSubmit}>
            <Form.Label htmlFor="roomCode">
              <div className="enterMessage">방 입장코드</div>
              <br></br>
            </Form.Label>
            <Form.Control
              type="text"
              id="roomCode"
              aria-describedby="roomCodeHelpBlock"
              required
              onChange={onChangeRandomCode}
            />
            <br></br>
            <Form.Control.Feedback type="invalid">
              <div className="enterMessage">입장코드를 입력해 주세요.</div>
            </Form.Control.Feedback>
            <Form.Text as="p" id="roomCodeHelpBlock" muted>
              <div className="enterMessage">
                방 생성시 주어지는 랜덤 코드를 입력하세요.
              </div>
            </Form.Text>
            <Button type="submit" variant="primary">
              입장
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default RoomPage;
