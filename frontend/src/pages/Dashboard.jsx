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
  const API_BASE = "http://127.0.0.1:8000";

  // ✅ Fetch user info + files
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

  // ✅ Handle file upload
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
      alert("File uploaded successfully!");
      const newFile = await res.json();
      setFiles((prev) => [...prev, newFile]);
      setSelectedFile(null);
    } else {
      alert("Upload failed");
    }

    setUploading(false);
  };

  // ✅ Handle file delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this file?")) return;

    const res = await fetch(`${API_BASE}/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } else {
      alert("Failed to delete file");
    }
  };

  // ✅ Handle file download
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

  if (loading) return <div className="text-center mt-40 text-xl">Loading...</div>;

  return (
    <div className="flex flex-col items-center mt-16 gap-6">
      <h1 className="text-3xl font-semibold">Welcome, {user.username} 👋</h1>
      <p className="text-gray-600">{user.email}</p>

      <form onSubmit={handleUpload} className="flex gap-3 items-center">
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="w-3/4 mt-8">
        <h2 className="text-2xl font-semibold mb-3">Your Files</h2>
        {files.length === 0 ? (
          <p className="text-gray-500">No files uploaded yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex justify-between items-center border p-3 rounded shadow-sm"
              >
                <span>{file.filename}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownload(file.id, file.filename)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="bg-gray-500 text-white px-4 py-2 rounded mt-10"
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
