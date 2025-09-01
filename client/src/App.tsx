import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import VerifySignup from "./pages/VerifySignup";
import Login from "./pages/Login";
import VerifyLogin from "./pages/VerifyLogin";
import Dashboard from "./pages/Dashboard";

import { Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-signup" element={<VerifySignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-login" element={<VerifyLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
