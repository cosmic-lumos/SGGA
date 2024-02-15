import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
import "../style/roominfo.css";

const RoomInfo = (props) => {
  const location = useLocation();
  const userInfo = { ...location.state };
  const [spinnerMode, setSpinnerMode] = useState("border");
  const { code } = useParams();

  return (
    <StompSessionProvider
      onConnect={() => {
        setSpinnerMode("");
      }}
      url={"ws://10.255.81.70:8029/sgga-websocket"}
    >
      <Container>
        <Spinner animation={spinnerMode} role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <Information
          name={userInfo.name}
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
        body: JSON.stringify({ name: name }),
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
      <tr className="seatTableTr">
        {range(start, end, 1).map((idx) => {
          if (names.length <= idx) {
            return (
              <td className="seatTableTd" key={idx}>
                {" "}
              </td>
            );
          }
          return (
            <td className="seatTableTr" key={idx}>
              {names[idx].name}
            </td>
          );
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
      <Table className="seatTable">
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
