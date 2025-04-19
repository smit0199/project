import React, { useState } from 'react';
import './login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-tabs">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Signup</button>
        </div>

        {isLogin ? (
          <form className="login-form">
            <h2>Login</h2>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <form className="login-form">
            <h2>Signup</h2>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="submit">Signup</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
