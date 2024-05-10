import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/error" />} />
            <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
