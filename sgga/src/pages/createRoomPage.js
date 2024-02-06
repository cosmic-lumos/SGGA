function CreateRoomPage() {
  return (
    <div className="createRoomPage">
      <div className="title">SGGA</div>
      <div className="buttonSet">
        <div className="fourPersonTable">
          <div className="text">4인용 테이블 개수</div>
          <div className="modify">
            <div className="modifyButton">-</div>
            <div className="fourtablenum">수량</div>
            <div className="modifyButton">+</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomPage;
