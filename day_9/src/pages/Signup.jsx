import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  firstName: yup.string().required('First name is required').min(2, 'At least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'At least 2 characters'),
  email: yup.string().required('Email is required').email('Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'At least 8 characters')
    .matches(/[A-Z]/, 'Add one uppercase letter')
    .matches(/[0-9]/, 'Add one number'),
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms')
});

function Signup() {
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    }
  });

  const onSubmit = async (data) => {
    setMessage('');
    await new Promise((resolve) => setTimeout(resolve, 700));
    setMessage(`Signed up ${data.firstName} ${data.lastName}`);
    reset();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Create Account</h2>
        <p>All fields validated with Yup; form resets after success.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid">
          <label className="field">
            <span>First Name</span>
            <input placeholder="Jane" {...register('firstName')} />
            {errors.firstName && <span className="error">{errors.firstName.message}</span>}
          </label>
          <label className="field">
            <span>Last Name</span>
            <input placeholder="Doe" {...register('lastName')} />
            {errors.lastName && <span className="error">{errors.lastName.message}</span>}
          </label>
        </div>

        <label className="field">
          <span>Email</span>
          <input type="email" placeholder="you@example.com" {...register('email')} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </label>

        <div className="grid">
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              placeholder="8+ chars, 1 uppercase, 1 number"
              {...register('password')}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </label>
          <label className="field">
            <span>Confirm Password</span>
            <input
              type="password"
              placeholder="Re-enter password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
          </label>
        </div>

        <label className="checkbox">
          <input type="checkbox" {...register('terms')} />
          <span>I agree to the Terms & Conditions</span>
        </label>
        {errors.terms && <span className="error">{errors.terms.message}</span>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Create Account'}
        </button>
        {message && <p className="success">{message}</p>}
      </form>
    </div>
  );
}

export default Signup;
