import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required('Email is required').email('Enter a valid email'),
  password: yup.string().required('Password is required').min(6, 'At least 6 characters')
});

function Login() {
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data) => {
    setMessage('');
    await new Promise((resolve) => setTimeout(resolve, 600));
    setMessage(`Logged in as ${data.email}`);
    reset();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Login</h2>
        <p>Enter your email and password to continue.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            {...register('email')}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            {...register('password')}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Checking…' : 'Login'}
        </button>
        {message && <p className="success">{message}</p>}
        <p className="muted">Form resets after successful submit.</p>
      </form>
    </div>
  );
}

export default Login;
