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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Date of Birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button text="Get OTP" onClick={handleSubmit} />
    </div>
  );
};

export default Signup;
