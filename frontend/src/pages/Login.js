import React, { useState } from 'react';
import { signupUser, loginUser } from '../api';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Login({ setUser, show }) {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });

  // if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await loginUser({ email: form.email, password: form.password });
        setUser(res.username);
        localStorage.setItem('user', res.username);
        navigate("/");
      } else {
        if (form.password !== form.confirm) return alert("Passwords don't match");
        await signupUser({ username: form.username, email: form.email, password: form.password });
        alert('Signup success! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-tabs">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Signup</button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{isLogin ? 'Login' : 'Signup'}</h2>
          {!isLogin && <input name="username" type="text" placeholder="Username" onChange={handleChange} />}
          <input name="email" type="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          {!isLogin && (
            <input name="confirm" type="password" placeholder="Confirm Password" onChange={handleChange} />
          )}
          <button type="submit">{isLogin ? 'Submit' : 'Signup'}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
