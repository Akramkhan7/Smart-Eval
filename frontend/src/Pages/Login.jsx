import React from "react";
import FloatingAnimate from "../Animations/FloatingAnimate"; // Make sure this is correct path
import { useToast } from "../context/ToastContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { setUser } = useUser();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    enrollmentNumber: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(form);
    let res = "";
    if (form.role === "teacher") {
      res = await fetch("http://localhost:3000/teacher/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
    } else if (form.role === "admin") {
      res = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
    } else {
      res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
    }

    res = await res.json();

    if (res.messages?.length > 0) {
      const msg = res.messages[0];
      res.success ? showToast(msg, "success") : showToast(msg, "error");
    }
    if (res.success) {
      navigate(`/${form.role}/dashboard`);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden text-white">
      {/* Background Animation */}
      <FloatingAnimate />

      {/* Login Card */}
      <div
        className="relative w-full max-w-md p-8 rounded-2xl 
            backdrop-blur-xl
            border border-white/30 shadow-xl z-10"
      >
        {/* User Icon */}
        <div
          className="absolute top-2 left-1/2 transform -translate-x-1/2 
              bg-white/10 p-4 rounded-full border border-white/20 z-20"
        >
          <svg width="50" height="50" fill="white" viewBox="0 0 512 512">
            <path
              d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256
            256-114.6 256-256S397.4 0 256 0zm0 96c44.1 0 80 35.9 80 80s-35.9 
            80-80 80-80-35.9-80-80 35.9-80 80-80zm0 352c-52.9 0-100.9-25.9-130.6-65.9
            14.8-39.6 52.7-66.1 97.1-66.1h67c44.4 0 82.3 26.5 97.1 66.1C356.9 
            422.1 308.9 448 256 448z"
            />
          </svg>
        </div>

        <form
          onSubmit={submitHandler}
          className="mt-16 space-y-6 z-20 relative"
        >
          <h1 className="text-2xl font-bold text-center text-white p-2">
            User Login
          </h1>

          {/* enrollmentNumber */}
          <div className="border-b border-white/40 py-2 flex items-center gap-3">
            <input
              type="enrollmentNumber"
              placeholder="Enrollment ID"
              name="enrollmentNumber"
              onChange={(e) =>
                setForm({ ...form, enrollmentNumber: e.target.value })
              }
              className="bg-transparent text-white placeholder-white/60 w-full outline-none"
            />
          </div>

          {/* Password */}
          <div className="border-b border-white/40 py-2 flex items-center gap-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-transparent text-white placeholder-white/60 w-full outline-none"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex justify-start gap-5 items-center text-white/70 text-sm">
            {/* Radio Buttons */}
            Login As:
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  required
                  checked={form.role === "student"}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="accent-blue-400"
                />
                Student
              </label>

              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={form.role === "teacher"}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="accent-blue-400"
                />
                Teacher
              </label>

              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={form.role === "admin"}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="accent-blue-400"
                />
                Admin
              </label>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full text-white text-lg font-semibold
            bg-linear-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Sign Up */}
       <p className="text-center text-white/60 text-sm mt-6">
  Don't have an account?
  <span 
    onClick={() => navigate("/register")} 
    className="ml-1 text-white cursor-pointer hover:underline"
  >
    Sign Up
  </span>
</p>
      </div>
    </div>
  );
};

export default Login;
