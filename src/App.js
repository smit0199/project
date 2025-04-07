import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Event from "./pages/Event";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/footer";
import "./style.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="hadder">
          <h1 className="title-txt">Festoria </h1>
          <div>
            <Link className="Home" to="/">Home</Link>
            <Link className="Event" to="/event">Events</Link>
            <Link className="Createvent" to="/create">Create Event</Link>
            <Link className="Dashboard" to="/dashboard">Dashboard</Link>
            <Link className="Login" to="/login">Login</Link>
          </div>
        </nav>
        {/* <div className="container"> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        {/* </div> */}
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
