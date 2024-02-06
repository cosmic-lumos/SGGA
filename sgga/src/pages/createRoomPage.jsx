import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SizeStepper from "../component/sizeStepper";
import useSizeStepper from "../hooks/useSizeStepper";
import { useLocation } from "react-router-dom";

function CreateRoomPage() {
  const location = useLocation();
  const userInfo = { ...location.state };

  const [sizeTable, sizeTableStepUp, sizeTableStepDown] = useSizeStepper(
    100,
    0
  );
  const [sizeTable6, sizeTableStepUp6, sizeTableStepDown6] = useSizeStepper(
    100,
    0
  );

  return (
    <Container
      className="w-70 text-center"
      style={{ width: "70%", height: "100%" }}
    >
      <Row className="align-items-center" style={{ height: "20%" }}>
        <h1>SGGA</h1>
      </Row>
      <Row className="align-items-center" style={{ height: "15%" }}>
        <h1>{userInfo.name}님 반갑습니다.</h1>
      </Row>
      <SizeStepper
        size={4}
        sizeTable={sizeTable}
        sizeTableStepUp={sizeTableStepUp}
        sizeTableStepDown={sizeTableStepDown}
      ></SizeStepper>
      <br></br>
      <SizeStepper
        size={6}
        sizeTable={sizeTable6}
        sizeTableStepUp={sizeTableStepUp6}
        sizeTableStepDown={sizeTableStepDown6}
      ></SizeStepper>
      <br></br>
      <p className="lead">
        <a
          className="btn btn-lg btn-light fw-bold border-white bg-white"
          style={{ width: 150 }}
        >
          확인
        </a>
      </p>
    </Container>
  );
}

export default CreateRoomPage;
