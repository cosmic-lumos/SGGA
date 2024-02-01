import "./App.css";
import mainPage from "../pages/mainPage";
import createRoomPage from "../pages/createRoomPage";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/" element={<mainPage />} />
        {/* <SignIn /> */}
        <Route path="/createRoom" element={<createRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
