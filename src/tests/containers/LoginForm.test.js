import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { LoginForm } from "../../containers/LoginForm";
import { mapStateToProps, mapDispatchToProps } from "../../containers/LoginForm";
import { Alert } from "react-bootstrap";
import { INITIATE_RESET } from "../../store/actions/actionTypes";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

describe("<LoginForm />", () => {
  const props = {
    errors: "",
    LoginUser: jest.fn(() => {
      Promise.resolve();
    }),
    loginUser: { errors: "", isLoading: true },
    validateLoginForm: jest.fn()
  };
  const wrapper = shallow(<LoginForm {...props} />);
  const wrapperInstance = wrapper.instance();
  it("should properly show registration form when the span is clicked", () => {
    const createSpy = toSpy => jest.spyOn(wrapperInstance, toSpy);
    const swapModal = createSpy("swapModal");
    wrapperInstance.forceUpdate();
    const span = wrapper.find("span").at(1);
    span.simulate("click");
    expect(swapModal).toHaveBeenCalled();
  });
  it("Should update state whenever data is entered in the input fields", () => {
    const event = {
      target: {
        name: "email",
        value: "user@me.com"
      }
    };
    wrapperInstance.handleChange(event);
    expect(wrapperInstance.state.email).toEqual(event.target.value);
  });
  it("Should dismiss the alert when the close button is clicked", () => {
    const event = {
      target: {
        onAlertClose: jest.fn()
      }
    };
    wrapperInstance.onAlertClose(event);
    expect(wrapperInstance.state.show).toEqual(false);
  });
  it("Should dispatch the LoginUser function when the form is submitted with correct input", () => {
    const event = {
      preventDefault: jest.fn()
    };
    const state = {
      email: "mimi@mail.com",
      password: "password"
    };
    wrapperInstance.setState(state);
    wrapperInstance.handleSubmit(event);
    expect(props.LoginUser).toHaveBeenCalledWith(state);

  });
  it("submit button should be disabled when the user presses it", () => {
    const event = {
      preventDefault: jest.fn()
    };
    const state = {
      email: "mimi@mail.com",
      password: "password"
    };
    wrapperInstance.setState(state);
    wrapperInstance.handleSubmit(event);
    const submitButton = wrapper.find('.btn-disabled.btn-one')
    expect(submitButton.text()).toEqual('<ButtonSpinner />');

  })
  it("Should return state as being an empty state when there were no errors from the form validation", () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        validateLoginForm: jest.fn()
      }
    };
    const state = {
      email: "mimi@mail.com",
      password: "password",
      formErrors: {}
    };
    wrapperInstance.setState(state);
    wrapperInstance.handleSubmit(event);
    expect(wrapperInstance.state.formErrors).toEqual([]);
  });
  it("Should set errors in the state if the login form is empty on submit", () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        validateLoginForm: jest.fn()
      }
    };
    const state = {
      email: "",
      password: "",
      formErrors: {}
    };
    wrapperInstance.setState(state);
    wrapperInstance.handleSubmit(event);
    expect(wrapperInstance.state.formErrors).toEqual([
      "email",
      "Please provide an email address!"
    ]);
  });
  it("Should return null if we pass in a form with errors", () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        handleSubmit: jest.fn()
      }
    };
    const state = {
      email: "",
      password: "",
      formErrors: {}
    };
    wrapperInstance.setState(state);
    const handleSubmit = jest.fn();
    wrapperInstance.handleSubmit(event);
    expect(handleSubmit).not.toHaveReturned();
  }); 
});

describe("<LoginForm /> when there are errors from a request", () => {
  const props = {
    errors: "",
    LoginUser: jest.fn(() => {
      Promise.resolve();
    }),
    loginUser: { errors: "A user with this email and password was not found" },
    validateLoginForm: jest.fn()
  };
  const wrapper = shallow(<LoginForm {...props} />);
  expect(wrapper.find(Alert)).toHaveLength(1);
});

describe("<LoginForm /> when there are errors in the password input", () => {
  const props = {
    errors: "",
    LoginUser: jest.fn(() => {
      Promise.resolve();
    }),
    loginUser: { errors: "" },
    validateLoginForm: jest.fn()
  };
  const state = {
    email: "test@mail.com",
    password: "",
    formErrors: ["password", "Please provide your password"]
  };
  const wrapper = shallow(<LoginForm {...props} />);
  const wrapperInstance = wrapper.instance();
  wrapperInstance.setState(state);
  expect(wrapper.find("div.password-warning").text()).toEqual(
    "Please provide your password"
  );
});

describe('LoginForm callInitiateReseForm', () => {
  it("should dispatch an action when called", () => {
  const props = {
    errors: "",
    LoginUser: jest.fn(() => {
      Promise.resolve();
    }),
    loginUser: { errors: "" },
    validateLoginForm: jest.fn()
  };
  const wrapper = shallow(<LoginForm {...props} />);
  const wrapperInstance = wrapper.instance();
  const spy = jest.spyOn(wrapperInstance, 'callInitiateResetForm');
  wrapperInstance.callInitiateResetForm();
  expect(spy).toHaveBeenCalled();
});
});

describe("mapStateToProps function", () => {
  it("should map the state we pass to the props", () => {
    const state = {
      loginUser: {
        loggedIn: false,
        errors: ""
      }
    };
    const props = mapStateToProps(state);
    expect(props).toEqual(state);
  });
});

describe('MapDispatchToProps', () => { 
  const payload = { isRegister: false, modalShow: true }
  const dispatch = jest.fn()
  it('login user function is called', () => {
    mapDispatchToProps(dispatch).LoginUser(payload);
    expect(dispatch).toHaveBeenCalled();
  });
});
