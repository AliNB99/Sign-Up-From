import React from "react";
import SignUpForm from "./pages/SignUpForm";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sign" />} />
      <Route path="/sign" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
