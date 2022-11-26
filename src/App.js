import React from "react";
import "./App.css";
import Landing from "./pages/Landing.js";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import CreateEvent from "./pages/CreateEvent.js";
import CreateEvent2 from "./pages/CreateEvent2.js";
import Dashboard from "./pages/Dashboard";
import Meet from "./pages/Meet";
import AddFriends from "./pages/AddFriends";
import { AuthContextProvider } from "./components/AuthContext";
import { Route, Routes } from "react-router-dom";

function App() {
  //creating objects with state to represent event info

  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/temp" element={<CreateEvent />} />
          <Route path="/temp2" element={<CreateEvent2 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meet" element={<Meet />} />
          <Route path="/addfriends" element={<AddFriends />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
