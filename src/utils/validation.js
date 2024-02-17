const RegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validation = (form, type) => {
  const { firstName, lastName, email, password, confirmPassword, isAccepted } =
    form;

  const warning = {};

  if (!email) {
    warning.email = "please enter email";
  } else if (!RegexEmail.test(email)) {
    warning.email = "Please enter the email in the correct format";
  } else {
    delete warning.email;
  }

  if (!password) {
    warning.password = "please enter password";
  } else if (password.length < 6) {
    warning.password = "Password must be at least 6 characters long";
  } else {
    delete warning.password;
  }

  if (type === "sign") {
    if (!firstName) {
      warning.firstName = "please enter first name";
    } else {
      delete warning.firstName;
    }

    if (!lastName) {
      warning.lastName = "please enter last name";
    } else {
      delete warning.lastName;
    }

    if (!confirmPassword) {
      warning.confirmPassword = "please enter confirm password";
    } else if (confirmPassword !== password) {
      warning.confirmPassword =
        "The verification password must match the original password";
    } else {
      delete warning.confirmPassword;
    }

    if (!isAccepted) {
      warning.isAccepted = "Please agree to the rules.";
    }
  }

  return warning;
};

export default validation;
