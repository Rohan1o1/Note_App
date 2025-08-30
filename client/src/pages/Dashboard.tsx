import { useEffect, useState } from "react";
import api from "../utils/api";
import NoteCard from "../components/NoteCard";

const Dashboard = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  const addNote = async () => {
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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div className="flex mb-4">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 border px-2 py-1 rounded-l-md"
          placeholder="Enter note"
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onDelete={deleteNote} />
      ))}
    </div>
  );
};

export default Dashboard;
