import React from 'react';
import loginAction from "./actions";
import LoginForm from '../components/Login';

export default function LoginPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <h1>LOGIN</h1>
      <LoginForm action={loginAction} />
    </div>
  );
}
