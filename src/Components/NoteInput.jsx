// src/components/NoteInput.js
import React, { useState } from 'react';

function NoteInput({ addNote }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      addNote(inputText);
      setInputText('');
    }
  };

  return (
    <form className="note-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your note..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteInput;
