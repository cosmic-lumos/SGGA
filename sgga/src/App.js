import "./App.css";
import MainPage from "./pages/mainPage";
import CreateRoomPage from "./pages/createRoomPage";
import { useNavigate } from "react-router-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/main" element={<MainPage />} />
        {/* <SignIn /> */}
        <Route path="/createRoom" element={<CreateRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
