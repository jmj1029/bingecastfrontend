"use client";
import React, { useState } from 'react';
import { TextInput, Button } from 'flowbite-react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    // Handle sign-up logic here, connecting to backend API if necessary
    if (password === confirmPassword) {
      console.log('Signing up with:', email, password);
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <form className="w-full max-w-sm" onSubmit={handleSignUp}>
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <TextInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4"
        />
        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4"
        />
        <TextInput
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mb-4"
        />
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
    </main>
  );
}

