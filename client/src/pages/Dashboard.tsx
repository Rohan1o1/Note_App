
import { useEffect, useState } from "react";
import api from "../utils/api";

const Dashboard = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [content, setContent] = useState("");
  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}") || {};

  const fetchNotes = async () => {
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!content.trim()) return;
    await api.post("/notes", { content });
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Top bar */}
      <div className="w-full flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="HD Logo" className="w-6 h-6" />
          <span className="font-semibold text-lg">HD</span>
        </div>
        <a href="/login" className="text-blue-600 hover:underline text-sm font-medium">Sign Out</a>
      </div>

      {/* Welcome card */}
      <div className="w-full max-w-md mt-6 px-4">
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <div className="font-bold text-lg mb-1">Welcome, {userInfo.name ? userInfo.name : "User"} !</div>
          <div className="text-gray-600 text-sm">Email: {userInfo.email ? userInfo.email : ""}</div>
        </div>

        {/* Create Note */}
        <div className="mb-4">
          <input
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mb-2"
            placeholder="Enter note"
          />
          <button
            onClick={addNote}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-2 rounded-md font-semibold"
          >
            Create Note
          </button>
        </div>

        {/* Notes List */}
        <div className="mb-2 font-semibold text-gray-700">Notes</div>
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note._id} className="flex items-center bg-white border rounded-md px-3 py-2 shadow-sm">
              <span className="flex-1 text-gray-800">{note.content}</span>
              <button
                onClick={() => deleteNote(note._id)}
                className="ml-2 text-gray-500 hover:text-red-600"
                title="Delete"
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg> */}
                <img src="/delete.png" alt="" className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
