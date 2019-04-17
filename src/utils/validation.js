function validateLoginForm(email, password) {
  const errors = [];
  if (email.length === 0) {
    errors.push('email', 'Please provide an email address!');
  } else if (password.length === 0) {
    errors.push('password', 'Please provide your password');
  }
  return errors;
}

export default validateLoginForm;
