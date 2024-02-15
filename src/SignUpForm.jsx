import React, { useState } from "react";

// amounts for create input
import inputAmounts from "./constants/inputAmounts.js";

// styles
import "./SignUpForm.css";

function SignUpForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    roles: false,
    gender: "",
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm((form) => ({ ...form, [name]: value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        {inputAmounts.map((i) => {
          return (
            <div
              className={
                i.name !== "roles" ? "input__container" : "input__roles"
              }
              key={i.id}
            >
              <label htmlFor={i.name}>{i.label}</label>
              <input
                id={i.name}
                type={i.type}
                name={i.name}
                value={form[i.name]}
                onChange={changeHandler}
              />
            </div>
          );
        })}

        <button type="submit">click</button>
      </form>
    </div>
  );
}

export default SignUpForm;
