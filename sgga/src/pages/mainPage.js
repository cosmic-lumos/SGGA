import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Example = (props) => {
  const handleChange = (e) => {
    props.setName(e.target.value);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ color: "black" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          이름을 입력해주세요.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" name="name" onChange={handleChange}></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

function MainPage() {
  const navigate = useNavigate();

  const [modalShow, setModalShow] = React.useState(true);

  const goToCreateRoom = () => {
    navigate("/createRoom");
  };

  const [values, setValues] = useState("");

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <Example
        setName={setValues}
        show={modalShow}
        onHide={() => setModalShow(false)}
      ></Example>
      <header className="mb-auto">
        <div>
          <h3 className="float-md-center mb-0">{values}</h3>
          <nav className="nav nav-masthead justify-content-center float-md-end"></nav>
        </div>
      </header>

      <main className="px-3">
        <h1>SGGA</h1>
        <p className="lead">
          <a
            onClick={goToCreateRoom}
            className="btn btn-lg btn-light fw-bold border-white bg-white"
            style={{ width: 150 }}
          >
            방 만들기
          </a>
        </p>
        <p className="lead">
          <a
            href="#"
            className="btn btn-lg btn-light fw-bold border-white bg-white"
            style={{ width: 150 }}
          >
            방 입장하기
          </a>
        </p>
      </main>

      <footer className="mt-auto text-white-50">
        <p>
          Cover template for{" "}
          <a href="https://getbootstrap.com/" className="text-white">
            Bootstrap
          </a>
          , by{" "}
          <a href="https://twitter.com/mdo" className="text-white">
            @mdo
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

export default MainPage;
