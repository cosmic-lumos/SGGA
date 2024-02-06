import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  StompSessionProvider,
  useSubscription,
  useStompClient,
} from "react-stomp-hooks";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Table,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RoomInfo = (props) => {
  const [spinnerMode, setSpinnerMode] = useState("border");
  const { code } = useParams();

  return (
    <StompSessionProvider
      onConnect={() => {
        setSpinnerMode("");
      }}
      url={"ws://localhost:8080/sgga-websocket"}
    >
      <Container>
        <Spinner animation={spinnerMode} role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <Information
          name={props.userName}
          code={code}
          hidden={spinnerMode === "border"}
        />
      </Container>
    </StompSessionProvider>
  );
};

const Information = (props) => {
  const [info, setInfo] = useState(null);
  const [name, setName] = useState(props.name ? props.name : "기본이름");
  const stompClient = useStompClient();

  const enterRoom = () => {
    if (stompClient) {
      stompClient.publish({
        destination: `/app/${props.code}/join`,
        body: JSON.stringify({ name: name }),
      });
    }
  };

  const randomSeat = () => {
    if (stompClient) {
      stompClient.publish({
        destination: `/app/${props.code}/randomSeat`,
        body: JSON.stringify({ name: "안녕" }),
      });
    }
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  useSubscription("/room/" + props.code, (roomDto) => {
    setInfo(JSON.parse(roomDto.body));
  });

  return (
    <div hidden={props.hidden}>
      <Row>
        <Col xs={10}>
          <h1>{name}</h1>
        </Col>
        <Col xs={2}>
          <p className="text-end">
            입장코드
            {props.code}
          </p>
        </Col>
        <Button onClick={enterRoom}>눌러봐</Button>
      </Row>
      <Row>
        <Col xs={2}>
          <UserList info={info}></UserList>
        </Col>
        <Col xs={10}>
          <SeatTable info={info}></SeatTable>
        </Col>
      </Row>
      <Row>
        <Button variant="secondary" onClick={randomSeat}>
          자리배치
        </Button>
      </Row>
    </div>
  );
};

const UserList = (props) => {
  if (props.info == null) {
    return;
  }

  const hostEmo = (name) => {
    if (name === props.info.host.name) {
      return "👑";
    }
    return "";
  };

  return (
    <ListGroup as="ul">
      {props.info.users.map((value, index) => {
        return (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={index}
          >
            <div className="fw-bold">
              {hostEmo(value.name)}
              {value.name}
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

const SeatTable = (props) => {
  if (props.info == null) {
    return;
  }

  const checkName = (name) => {
    return name != null ? name : "";
  };

  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  const makeRow = (names, start, end) => {
    return (
      <tr>
        {range(start, end, 1).map((idx) => {
          if (names.length <= idx) {
            return <td key={idx}></td>;
          }
          return <td key={idx}>{names[idx].name}</td>;
        })}
      </tr>
    );
  };

  const makeSeat = (users) => {
    if (users == null) {
      return;
    }
    if (users.length > 4) {
      return (
        <Table>
          {makeRow(users, 0, 2)}
          {makeRow(users, 3, 5)}
        </Table>
      );
    }
    return (
      <Table>
        {makeRow(users, 0, 1)}
        {makeRow(users, 2, 3)}
      </Table>
    );
  };

  if (props.info.tables.length === 0) {
    return "돌려돌려돌림판";
  }

  return (
    <div className="text-center">
      {props.info.tables.map((users) => {
        return makeSeat(users);
      })}
    </div>
  );
};

export default RoomInfo;
