import React from 'react';
import loginAction from './actions';
import LoginForm from '../components/Login';

export const metadata = {
  title: 'Login',
};

async function scheduleCronJob() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const response = await fetch(`${baseUrl}/api/cron`, {
      method: 'POST',
    });
    const data = await response.json();

    if (!response.ok) {
      console.error('Error scheduling cron job:', data.error);
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.error('Error calling cron API route:', error);
  }
}

scheduleCronJob();

export default function LoginPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1>LOGIN</h1>
      <LoginForm action={loginAction} />
    </div>
  );
}
