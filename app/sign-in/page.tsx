"use client";
import React, { useState } from 'react';
import { TextInput, Button } from 'flowbite-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

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
        // Store token and display it on the page
        localStorage.setItem("authToken", data.token);
        setToken(data.token);  // Set the token state to display it
        setError(null);  // Clear any previous errors
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

        {token ? (
          <div className="text-center">
            <p className="text-green-600 mb-4">Successfully signed in!</p>
            <p className="text-gray-700">Token: <span className="font-mono text-sm">{token}</span></p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </form>
    </main>
  );
}
