import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      setError(data.detail || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 mx-auto mt-20">
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="p-2 border rounded" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="p-2 border rounded" />
      <button className="bg-green-500 text-white p-2 rounded">Register</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
