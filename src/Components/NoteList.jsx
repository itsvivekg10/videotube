// src/components/NoteList.js
import React from "react";

function NoteList({ notes, deleteNote }) {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <div className="note" key={note.id}>
          <p>{note.text}</p>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
