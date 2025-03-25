"use client";
import { Button } from "@mui/material";
import React from "react";

const Login: React.FC = () => {
  // const handleLogin = (username: string, password: string): void => {
  // Add your login logic here
  //     console.log('Logging in with:', username, password);
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border border-gray-300 rounded"
        />
        <Button variant="contained" color="primary">
          Add new
        </Button>
      </form>
      <a href="/register" className="mt-4 text-blue-500 hover:underline">
        Dont have an account? Register here.
      </a>
    </div>
  );
};

export default Login;
