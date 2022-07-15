import { React, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import "../css/Note.css";
import Note from "./Note"
import CreateNote from "./CreateNote";

function Notes() {
  
const [notes, setNotes] = useState([]);
const [inputText, setInputText] = useState("");

const textHandler = (e) => {
  setInputText(e.target.value);
};

// добавить новую заметку в массив состояния
const saveHandler = () => {
  setNotes((prevState) => [
    ...prevState,
    {
      id: uuid(),
      text: inputText,
    },
  ]);
  //очистить текстовое поле
  setInputText("");
};

const deleteNote = (id) => {
  const filteredNotes = notes.filter((note) => note.id !== id);
  setNotes(filteredNotes);
};

useEffect(() => {
  const data = JSON.parse(localStorage.getItem("Notes"));
  if (data) {
    setNotes(data);
  }
}, []);

useEffect(() => {
  localStorage.setItem("Notes", JSON.stringify(notes));
}, [notes]);



  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          deleteNote={deleteNote}
        />
      ))}
      <CreateNote
        textHandler={textHandler}
        saveHandler={saveHandler}
        inputText={inputText}
       />
    </div>
  );
}
export default Notes;