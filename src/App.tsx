import React, { useEffect } from "react";
import "./App.css";
import { auth } from "./firebase";

const App: React.FC = (props: any) => {
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("/login");
    });
    return () => unSub();
  });

  const logout = async () => {
    try {
      await auth.signOut();
      props.history.push("login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <h1>Main page</h1>
      <button onClick={logout}>Sign out</button>
    </div>
  );
};

export default App;
