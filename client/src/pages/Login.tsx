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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 bg-white shadow-lg md:rounded-l-2xl">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Sign in</h2>
          <p className="mb-6 text-gray-500 text-sm">Please login to continue to your account.</p>
          <Input id="login-email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button text="Get OTP" onClick={handleSubmit} className="mt-4" />
          <div className="mt-4 text-sm text-gray-500">Need an account? <a href="/signup" className="text-blue-600 hover:underline">Create one</a></div>
        </div>
      </div>
      {/* Right: Image */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-100 md:rounded-r-2xl">
        <img src="/container.png" alt="login visual" className="object-cover max-h-[80vh] rounded-2xl" />
      </div>
    </div>
  );
};

export default Login;
