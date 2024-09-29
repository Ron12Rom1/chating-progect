// App.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";
import './index.css';  // Make sure this path is correct

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXjPe2fEu-Zy1uuagoo7Rhdjmf-_MNBoE",
  authDomain: "chat-website-411bf.firebaseapp.com",
  projectId: "chat-website-411bf",
  storageBucket: "chat-website-411bf.appspot.com",
  messagingSenderId: "1054243503365",
  appId: "1:1054243503365:web:b93cc39c385ff0c1990b6c",
  measurementId: "G-66G4NBF74M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Main App component
const App = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  // Fetch real-time data for Text Area 1
  useEffect(() => {
    const docRef = doc(db, "shared", "text1");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setText1(doc.data().content);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch real-time data for Text Area 2
  useEffect(() => {
    const docRef = doc(db, "shared", "text2");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setText2(doc.data().content);
      }
    });
    return () => unsubscribe();
  }, []);

  // Update Firestore for Text Area 1
  const handleText1Change = async (e) => {
    const newText1 = e.target.value;
    setText1(newText1);
    const docRef = doc(db, "shared", "text1");
    await setDoc(docRef, { content: newText1 });
  };

  // Update Firestore for Text Area 2
  const handleText2Change = async (e) => {
    const newText2 = e.target.value;
    setText2(newText2);
    const docRef = doc(db, "shared", "text2");
    await setDoc(docRef, { content: newText2 });
  };

  return (
    <div className="app-container">
      <h1 className="title">Real-time Shared Text Areas</h1>

      <div className="text-area-container">
        <h2 className="text-title">Text Area 1</h2>
        <textarea
          value={text1}
          onChange={handleText1Change}
          className="fun-textarea"
          rows="3"
          cols="50"
        />
      </div>

      <div className="text-area-container">
        <h2 className="text-title">Text Area 2</h2>
        <textarea
          value={text2}
          onChange={handleText2Change}
          className="fun-textarea"
          rows="3"
          cols="50"
        />
      </div>
    </div>
  );
};

// Render the App component
ReactDOM.render(<App />, document.getElementById("root"));
