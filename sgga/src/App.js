import "./App.css";
import MainPage from "./pages/mainPage";
import CreateRoomPage from "./pages/createRoomPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RoomPage from "./pages/roomPage";
import RoomInfo from "./pages/roomInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/main" element={<MainPage />} />
        {/* <SignIn /> */}
        <Route path="/createRoom" element={<CreateRoomPage />} />
        {/* <roomPage /> */}
        <Route path="/room" element={<RoomPage />} />
        <Route path="/room/:code" element={<RoomInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
