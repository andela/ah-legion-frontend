import validate from '../../utils/registerFormValidator';

let username = '';
let email = '';
let password = '';
let confirmPassword = '';

describe('register reducer', () => {
  it('should return errors for blank input', () => {
    expect(validate(username, email, password, confirmPassword)).toEqual(
      {username: "Username can't be blank", email: "Email should contain at least one dot", password: "Password should be at least 8 characters long"}
    )
  });

  it('should return errors for non-matching passwords and no @ email', () => {
    username = 'elmons tro'
    password = 'jayjayokocha'
    confirmPassword = 'elmonstro'
    email = 'jwww.com'
    expect(validate(username, email, password, confirmPassword)).toEqual(
      {username: "Username can't have spaces", email: "Email should contain a @", confirmPassword: "Passwords do not match"}
    )
  });
});

