import React from 'react';
import Login from '@react-login-page/page8';

const LoginPage = () => {
  const validUser = {
    email: 'abc@gmail.com',
    password: '1234'
  };

  const handleLogin = ({ email, password }) => {
    if (email === validUser.email && password === validUser.password) {
      alert('Login successful!');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <Login
      title="Welcome Back"
      subtitle="Enter your credentials"
      onLogin={handleLogin}
      style={{ height: 690 }}
    />
  );
};

export default LoginPage;
