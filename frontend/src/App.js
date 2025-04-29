import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Event from "./pages/Event";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/footer";
import "./style.css";
import SingleEvent from "./pages/SingleEvent";

function PrivateRoute({ user, children }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {

  const [user, setUser] = useState(localStorage.getItem("user"));
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!user && window.location.pathname === "/") {
      const timer = setTimeout(() => setShowLogin(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <nav className="hadder">
          <h1 className="title-txt">Festoria </h1>
          <div>
            <Link className="Home" to="/">Home</Link>
            <Link className="Event" to="/event">Events</Link>
            <Link className="Createvent" to="/create">Create Event</Link>
            {/* <Link className="Dashboard" to="/dashboard">Dashboard</Link> */}
            {user ?(
              <button onClick={handleLogout} className="Login">Logout</button>//new
            ):(
              <Link className="Login" to="/login">Login</Link>
            )}
          </div>
        </nav>
        {/* <div className="container"> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/create" element={<PrivateRoute user={user}> <CreateEvent /> </PrivateRoute>} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/login" element={<Login setUser={setUser} show={true}/>} />
            <Route path="/event/:id" element={<PrivateRoute user={user}> <SingleEvent /> </PrivateRoute>} />
          </Routes>
        {/* </div> */}
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
