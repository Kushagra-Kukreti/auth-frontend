import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AccountSettings from "./pages/AccountSettings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/register" &&
      location.pathname !== "/" &&
      location.pathname !== "/login" ? (
        <Header />
      ) : null}

      <Routes>
        <Route index element={<Signup />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account-settings" element={<AccountSettings />} />
      </Routes>
     {location.pathname !== "/register" &&
      location.pathname !== "/" &&
      location.pathname !== "/login" ? (
        <Footer />
      ) : null}
    </>
  );
}

export default App;
