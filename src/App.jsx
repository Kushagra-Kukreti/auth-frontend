import { Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"
import AccountSettings from "./pages/AccountSettings"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route index element={<Signup />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/account-settings" element={<AccountSettings />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
