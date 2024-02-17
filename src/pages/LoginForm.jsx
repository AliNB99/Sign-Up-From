import React, { useEffect, useState } from "react";
import validation from "../utils/validation";
import { Link } from "react-router-dom";

import styles from "./LoginForm.module.css";
import { CiLogin } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

function LoginForm() {
  const [warning, setWarning] = useState({});
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setWarning(validation(form));
  }, [form]);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm((form) => ({ ...form, [name]: value }));
  };

  const focusHandler = (event) => {
    const name = event.target.name;

    setTouched((touched) => ({ ...touched, [name]: true }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (Object.keys(warning).length) {
      setWarning(validation(form));
      toast.error("Please enter the required values");
      setTouched({
        email: true,
        password: true,
      });
    } else {
      setTouched({});
      setForm({ email: "", password: "" });
      toast.success("Information was sent successfully");
    }
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <form onSubmit={submitHandler}>
        <h1>Login</h1>
        <div className={styles.inputField}>
          <input
            className={
              warning.email && touched.email ? styles.warning : styles.formInput
            }
            id="email"
            type="text"
            name="email"
            placeholder={"Enter Email"}
            value={form.email}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {touched.email && warning.email && <label>{warning.email}</label>}
        </div>
        <div className={styles.inputField}>
          <input
            className={
              warning.password && touched.password
                ? styles.warning
                : styles.formInput
            }
            id="password"
            type="text"
            name="password"
            placeholder={"Enter password"}
            value={form.password}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {touched.password && warning.password && (
            <label>{warning.password}</label>
          )}
        </div>
        <div className={styles.submitContent}>
          <button type="submit">send</button>
          <Link to={"/sign"}>
            <span>sign up</span>
            <CiLogin size={20} />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
