"use client";
import React, { useState } from 'react';
import { TextInput, Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/session", {
        method: 'POST',
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ user: { email, password } }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      if (data.token) {
        // Store token and redirect on successful login
        localStorage.setItem("authToken", data.token);
        router.push("/");  // Redirect to homepage or dashboard
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form className="w-full max-w-sm bg-white shadow-lg rounded-lg p-8" onSubmit={handleSignIn}>
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back</h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

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

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold">
          Sign In
        </Button>
      </form>
    </main>
  );
}



