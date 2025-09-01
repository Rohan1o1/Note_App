import { useState } from "react";

import Input from "../components/Input";
import Button from "../components/Button";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await api.post("/auth/signup", { name, dob, email });
    localStorage.setItem("tempUser", JSON.stringify({ name, dob, email }));
    navigate("/verify-signup");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-8 md:p-16 bg-white">
        <div className="w-full max-w-md rounded-xl border md:border-none md:shadow-none shadow-lg p-6 md:p-0">
          {/* Logo and heading */}
          <div className="flex flex-col items-center mb-6">
            <img src="/logo.png" alt="HD Logo" className="w-8 h-8 mb-2" />
            <h2 className="text-2xl md:text-3xl font-bold mb-1 text-gray-900 text-center">Sign up</h2>
            <p className="mb-6 text-gray-500 text-sm text-center">Sign up to enjoy the feature of HD</p>
          </div>
          <div className="space-y-4 mb-4">
            <Input label="Your Name" value={name} onChange={(e) => setName(e.target.value)} id="signup-name" />
            <Input label="Date of Birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} id="signup-dob" />
            <Input  label="Email" value={email} onChange={(e) => setEmail(e.target.value)} id="signup-email" />
          </div>
          <Button text="Get OTP" onClick={handleSubmit} className="m-10 bg-[#2563eb] hover:bg-[#1d4ed8] text-base font-semibold" />
          <div className="mt-4 text-sm text-gray-500 text-center">
            Already have an account?? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
          </div>
        </div>
      </div>
      {/* Right: Image */}
      <div className="hidden md:flex max-w-screen-md h-full items-center justify-center bg-white">
        <img src="/container.png" alt="signup visual" className="object-cover max-h-[90vh] rounded-2xl" />
      </div>
    </div>
  );
};

export default Signup;
