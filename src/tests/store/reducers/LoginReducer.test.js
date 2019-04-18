import { LOGIN_SUCCESS, LOGIN_FAIL } from "../../../store/actions/actionTypes";
import loginReducer from "../../../store/reducers/LoginReducer";

describe("loginReducer", () => {
  const initialState = {
    loggedIn: false,
    errors: ""
  };
  it("should dispatch success action on login success", () => {
    const loginSuccess = {
      type: LOGIN_SUCCESS
    };
    const successState = {
      loggedIn: true,
      errors: ""
    };
    expect(loginReducer(initialState, loginSuccess)).toEqual(successState);
  });
  it("should dispatch failure action on login fail", () => {
    const loginFail = {
      type: LOGIN_FAIL,
      payload: "A user with this email and password was not found"
    };
    const failureState = {
      loggedIn: false,
      errors: loginFail.payload
    };
    const successState = {
      loggedIn: true,
      errors: ""
    };
    expect(loginReducer(initialState, loginFail)).toEqual(failureState);
    expect(loginReducer(initialState, loginFail)).not.toEqual(successState);
  });
  it("should return current state if action recieved doesn't match success or fail", () => {
    const LOGIN_TRIAL = "LOGIN_TRIAL";
    const invalidType = {
      type: LOGIN_TRIAL
    };
    const defaultState = {
      loggedIn: false,
      errors: ""
    };
    expect(loginReducer(initialState, invalidType)).toEqual(defaultState);
  });
});
