import React from 'react';
import LoginForm from '../components/Login';  // 确保路径正确

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
      <LoginForm />
    </div>
  );
}
