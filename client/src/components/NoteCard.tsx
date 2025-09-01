import React from "react";

interface Props {
  note: { _id: string; content: string };
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<Props> = ({ note, onDelete }) => {
  return (
    <div className="flex justify-between items-center border p-2 rounded-md mb-2">
      <p>{note.content}</p>
      <button
        onClick={() => onDelete(note._id)}
        className="text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </div>
  );
};

export default NoteCard;
