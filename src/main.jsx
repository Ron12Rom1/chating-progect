// App.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Main App component
const App = () => {
  const [text, setText] = useState("");

  // Fetch real-time data from Firestore
  useEffect(() => {
    const docRef = doc(db, "shared", "text");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setText(doc.data().content);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update Firestore on text change
  const handleChange = async (e) => {
    const newText = e.target.value;
    setText(newText);

    const docRef = doc(db, "shared", "text");
    await setDoc(docRef, { content: newText });
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Real-time Shared Text</h1>
      <textarea
        value={text}
        onChange={handleChange}
        rows="10"
        cols="50"
        style={{ fontSize: "16px" }}
      />
    </div>
  );
};

// Render the App component
ReactDOM.render(<App />, document.getElementById("root"));
