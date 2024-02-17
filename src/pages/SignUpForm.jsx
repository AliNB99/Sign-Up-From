import React, { useEffect, useState } from "react";
import inputAmounts from "../constants/inputAmounts.js";

import styles from "./SignUpForm.module.css";

import validation from "../utils/validation.js";
import { Link } from "react-router-dom";

import { CiLogin } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

function SignUpForm() {
  const [warning, setWarning] = useState({});
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAccepted: false,
  });

  useEffect(() => {
    setWarning(validation(form, "sign"));
    console.log(warning);
  }, [form]);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "isAccepted") {
      setForm((form) => ({ ...form, [name]: event.target.checked }));
    } else {
      setForm((form) => ({ ...form, [name]: value }));
    }
  };

  const focusHandler = (event) => {
    const name = event.target.name;

    setTouched((touched) => ({ ...touched, [name]: true }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (Object.keys(warning).length) {
      setWarning(validation(form, "sign"));
      toast.error("Please enter the required values");
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });
    } else {
      setTouched({});
      toast.success("Information was sent successfully");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false,
      });
    }
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <form onSubmit={submitHandler}>
        <h1>Sign Up</h1>
        {inputAmounts.map((i) => {
          return (
            <div key={i.name} className={styles.inputField}>
              <input
                className={
                  warning[i.name] && touched[i.name]
                    ? styles.warning
                    : styles.formInput
                }
                id={i.name}
                type={i.type}
                name={i.name}
                placeholder={i.placeholder}
                value={form[i.name]}
                onChange={changeHandler}
                onFocus={focusHandler}
              />
              {touched[i.name] && warning[i.name] && (
                <label>{warning[i.name]}</label>
              )}
            </div>
          );
        })}
        <div className={styles.rulesContent}>
          <div>
            <span>I accept all the rules of this site</span>
            <input
              id="isAccepted"
              type="checkbox"
              name="isAccepted"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
          </div>
          {warning.isAccepted && touched.isAccepted && (
            <label>{warning.isAccepted}</label>
          )}
        </div>

        <div className={styles.submitContent}>
          <button type="submit">submit</button>
          <Link to="/login">
            <span>Login</span> <CiLogin size={20} />
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
