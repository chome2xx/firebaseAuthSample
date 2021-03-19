import React, { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import { auth } from "./firebase";

const Login: React.FC = (props: any) => {
  const [email, setEmail] = useState("testuser@gmail.com");
  const [password, setPassword] = useState("testuser");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);

  const login = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      props.history.push("/");
    } catch (error) {
      setMessage(error.message);
      setCode(error.code);
    }
  };

  return (
    <div className={styles.login__root}>
      <h1>Login</h1>
      <form action="">
        <label htmlFor="email" className={styles.login__label}>
          E-Mail
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
      </form>
      <button onClick={login}>Login</button>
      <p className={styles.login__error}>{code}</p>
      <p className={styles.login__error}>{message}</p>
    </div>
  );
};

export default Login;
