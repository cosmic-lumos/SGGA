import "../styles/mainPage.css";
import React, { useState, useEffect } from "react";
import modal from "react-modal";
import { useNavigate } from "react-router-dom";

const Modal = (props) => {
  const { open, close } = props;

  const [values, setValues] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    close();
  };

  return (
    <div>
      {open ? (
        <div className="modal">
          <h4>이름을 입력해 주세요</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={values.name}
            ></input>
            <div></div>
            <button type="submit" className="modalSubmitButton">
              확인
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

function mainPage() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();

  const goToCreateRoom = () => {
    navigate("/createRoom");
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  console.log(modalIsOpen);
  return (
    <div className="mainPage">
      <Modal open={modalIsOpen} close={closeModal} />
      <div className="title" style={{ color: "white", fontSize: 60 }}>
        SGGA
      </div>
      <div className="buttonSet">
        <button
          className="createButton"
          onClick={goToCreateRoom}
          style={{ color: "white" }}
        >
          방 만들기
        </button>
        <button className="enterButton" style={{ color: "white" }}>
          방 입장하기
        </button>
      </div>
    </div>
  );
}

export default mainPage;
