import { useEffect, useState } from "react";
import axios from "axios";

export default function SavedWord({ word }) {
    
    function handleDelete(id) {
        axios.delete(`http://localhost:2222/deleteWords/${id}`);
      }
    return (
    <div>
      Saved Word <p>{word.word}</p>
      <button onClick={() => handleDelete(word.wordId)}>Delete Translation</button>
      
      
    </div>
  );
}
