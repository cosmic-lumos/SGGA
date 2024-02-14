import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useSizeStepper from "../hooks/useSizeStepper";

const SizeStepper = (props) => {
  return (
    <Row className="align-items-center">
      <Col>
        <div>{props.size}인용 테이블 개수</div>
      </Col>
      <Col></Col>
      <Col>
        <Row className="align-items-center">
          <Col>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-dash-circle-fill"
              viewBox="0 0 16 16"
              onClick={props.sizeTableStepDown}
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
            </svg>
          </Col>
          <Col>
            <div className="fourtablenum">{props.sizeTable}</div>
          </Col>
          <Col>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-plus-circle-fill"
              viewBox="0 0 16 16"
              onClick={props.sizeTableStepUp}
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SizeStepper;
