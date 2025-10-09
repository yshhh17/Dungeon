import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      alert("Registered successfully!");
    } else {
      const data = await res.json();
      setError(data.detail || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 mx-auto mt-40">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
      />
      <button className="bg-green-500 text-white p-2 rounded" type="submit">Register</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
