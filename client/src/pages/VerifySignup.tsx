import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const VerifySignup = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("tempUser") || "{}");

  const handleVerify = async () => {
    const res = await api.post("/auth/verify-otp", { ...userData, otp });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
      <Input label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <Button text="Sign Up" onClick={handleVerify} />
    </div>
  );
};

export default VerifySignup;
