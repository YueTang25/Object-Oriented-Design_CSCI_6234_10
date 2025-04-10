'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email: form.email, password: form.password }),
    });

    if (!res.ok) {
      setError("Invalid email or password");
    } else {
      router.push("/redirect"); // or wherever after login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md w-80 space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Value"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Value"
            required
          />
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 rounded">
          Submit
        </button>
      </form>

      <button
        onClick={() => router.push('/register')}
        className="mt-4 text-sm text-gray-600 hover:underline"
      >
        Don't have an account? Register here
      </button>
    </div>
  );
}

