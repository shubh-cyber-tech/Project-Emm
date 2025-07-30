import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: credentials, 2: otp
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    try {
      if (step === 1) {
        // First step: send email/password
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        if (data.message && data.message.includes('OTP sent')) {
          setStep(2);
          setInfo('OTP sent to your email. Please enter it below.');
        }
      } else {
        // Second step: send email/password/otp
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password, otp });
        localStorage.setItem('token', data.token);
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto', marginTop: 40 }}>
      <Typography variant="h5">Login</Typography>
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} disabled={step === 2} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} disabled={step === 2} />
      {step === 2 && (
        <TextField label="OTP" fullWidth margin="normal" value={otp} onChange={e => setOtp(e.target.value)} />
      )}
      <Button type="submit" variant="contained" fullWidth style={{ marginTop: 16 }}>{step === 1 ? 'Login' : 'Verify OTP'}</Button>
      {info && <Typography color="primary">{info}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </form>
  );
};

export default LoginPage; 