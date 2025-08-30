import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await api.post("/auth/login", { email });
    localStorage.setItem("tempEmail", email);
    navigate("/verify-login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button text="Get OTP" onClick={handleSubmit} />
    </div>
  );
};

export default Login;
