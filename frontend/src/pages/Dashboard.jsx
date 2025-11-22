import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserAndFiles = async () => {
      try {
        const userRes = await fetch(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error("Unauthorized");
        const userData = await userRes.json();
        setUser(userData);

        const filesRes = await fetch(`${API_BASE}/files`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const filesData = await filesRes.json();
        setFiles(filesData);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndFiles();
  }, [navigate, token]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Select a file first!");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch(`${API_BASE}/upload-async`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      const newFile = await res.json();
      setFiles((prev) => [...prev, newFile]);
      setSelectedFile(null);
    } else {
      alert("Upload failed");
    }

    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this file?")) return;

    const res = await fetch(`${API_BASE}/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) setFiles((prev) => prev.filter((f) => f.id !== id));
    else alert("Failed to delete file");
  };

  const handleDownload = async (id, filename) => {
    const res = await fetch(`${API_BASE}/download/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return alert("Failed to download file");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading)
    return <div className="text-center mt-40 text-xl text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold">Welcome, {user.username} 👋</h1>
          <p className="text-gray-400">{user.email}</p>
        </div>

        <form
          onSubmit={handleUpload}
          className="flex flex-col md:flex-row gap-4 items-center justify-center"
        >
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 w-full md:w-auto"
          />
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>

        <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">Your Files</h2>
          {files.length === 0 ? (
            <p className="text-gray-400">No files uploaded yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {files.map((file) => (
                <li
                  key={file.id}
                  className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700"
                >
                  <span className="text-white">{file.filename}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(file.id, file.filename)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition mt-4"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
