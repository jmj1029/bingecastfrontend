"use client";
import React, { useState } from 'react';
import { TextInput, Button } from 'flowbite-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();
    // Handle sign-in logic here, connecting to backend API if necessary
    console.log('Signing in with:', email, password);
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <form className="w-full max-w-sm" onSubmit={handleSignIn}>
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
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
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </main>
  );
}

