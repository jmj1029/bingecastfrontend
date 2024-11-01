"use client";
import React, { useState } from 'react';
import { TextInput, Button } from 'flowbite-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();
    // Handle sign-in logic here
    console.log('Signing in with:', email, password);
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form className="w-full max-w-sm bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back</h1>
        
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
          className="mb-6"
        />
        
        <Button type="submit" onClick={handleSignIn} className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold">
          Sign In
        </Button>
      </form>
    </main>
  );
}


