import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { useState } from "react";
import { AuthContext } from "./components/context";
import SubscriptionInfo from "./pages/SubscriptionPage/SubscriptionInfo";
import CollectionPage from "./pages/CollectionPage/Collection";

function App() {
  const [IsAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthContext.Provider value={{ 
      IsAuth, setIsAuth,
      name, setName,
      email, setEmail,
      password, setPassword
    }}>
      <BrowserRouter>
      <Routes>
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/SubscriptionInfo" element={<SubscriptionInfo />} />
          <Route path="/Collection" element={<CollectionPage />} />

          {IsAuth ? (
            <Route path="/ProfilePage" element={<ProfilePage />} />
          ) : (
            <Route path="/ProfilePage" element={<ErrorPage />} />
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
