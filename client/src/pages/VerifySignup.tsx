
import { useState } from "react";

import Button from "../components/Button";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const VerifySignup = () => {
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("tempUser") || "{}");

  const handleVerify = async () => {
    const res = await api.post("/auth/verify-otp", { ...userData, otp });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-8 md:p-16 bg-white">
        <div className="w-full max-w-md rounded-xl border md:border-none md:shadow-none shadow-lg p-6 md:p-0">
          {/* Logo and heading */}
          <div className="flex flex-col items-start mb-6">
            <div className="flex flex-row gap-3">
              <img src="/logo.png" alt="HD Logo" className="w-8 h-8 mb-2" />
            <h3>HD</h3>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-1 text-gray-900">Sign up</h2>
            <p className="mb-6 text-gray-500 text-sm">Sign up to enjoy the feature of HD</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Your Name</label>
              <input
                type="text"
                value={userData.name || ''}
                readOnly
                className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
              <input
                type="text"
                value={userData.dob || ''}
                readOnly
                className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Email</label>
              <input
                type="text"
                value={userData.email || ''}
                readOnly
                className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-900"
              />
            </div>
            <div className="relative">
              <label className="block text-xs text-gray-500 mb-1">OTP</label>
              <input
                type={showOtp ? "text" : "password"}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="w-full border rounded-md px-3 py-2 pr-10 text-gray-900"
                placeholder="Enter OTP"
              />
              <button type="button" onClick={() => setShowOtp(v => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showOtp ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0012 6.5c3.978 0 7.437 2.19 9.02 4.223a2.11 2.11 0 010 2.554C19.437 15.81 15.978 18 12 18c-3.978 0-7.437-2.19-9.02-4.223a2.11 2.11 0 010-2.554z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .512-.122.995-.338 1.418m-1.244 1.244A3 3 0 0112 15c-1.657 0-3-1.343-3-3 0-.512.122-.995.338-1.418m1.244-1.244L3.98 8.223m0 0A10.477 10.477 0 0112 6.5c3.978 0 7.437 2.19 9.02 4.223a2.11 2.11 0 010 2.554c-.457.623-1.05 1.28-1.77 1.93M3.98 8.223l1.284 1.284m14.756 7.27c-.457.623-1.05 1.28-1.77 1.93A10.477 10.477 0 0112 18c-3.978 0-7.437-2.19-9.02-4.223a2.11 2.11 0 010-2.554c.457-.623 1.05-1.28 1.77-1.93m14.756 7.27L18.02 16.77" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <Button text="Sign up" onClick={handleVerify} className="mt-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-base font-semibold" />
          <div className="mt-4 text-sm text-gray-500 text-center">
            Already have an account?? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
          </div>
        </div>
      </div>
      {/* Right: Image */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-white">
        <img src="/container.png" alt="signup visual" className="object-cover max-h-[80vh] rounded-2xl" />
      </div>
    </div>
  );
};

export default VerifySignup;
