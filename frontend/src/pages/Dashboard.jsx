import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // No token → redirect to login
      navigate("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/me", {
      headers: {
        Authorization: `Bearer ${token}`, // MUST include 'Bearer '
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        // Token invalid → remove it and redirect
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  if (loading) return <div className="text-center mt-40 text-xl">Loading...</div>;

  return (
    <div className="flex flex-col items-center mt-20 gap-6">
      <h1 className="text-3xl font-semibold">Welcome, {user.username} 👋</h1>
      <p className="text-gray-600">{user.email}</p>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
