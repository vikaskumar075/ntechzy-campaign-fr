import React from "react";
import DropDown from "./components/DropDown";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AuthState from "./context/Auth/AuthState";
import toast, {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <AuthState>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" exact element={<DropDown />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthState>
  );
};

export default App;
