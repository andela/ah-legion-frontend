function validate(username, email, password, confirmPassword) {
  const errors = {};

  if (/\s/.test(username)) {
    errors.username = "Username can't have spaces";
  }
  if (username.length === 0) {
    errors.username = "Username can't be blank";
  }
  if (email.length < 5) {
    errors.email = 'Email must be at least five characters';
  }
  if (email.split('').filter(x => x === '@').length !== 1) {
    errors.email = 'Email should contain a @';
  }
  if (email.indexOf('.') === -1) {
    errors.email = 'Email should contain at least one dot';
  }

  if (password.length < 8) {
    errors.password = 'Password should be at least 8 characters long';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
}

export default validate;
