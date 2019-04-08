import { ConnectedRegisterForm, mapDispatchToProps } from '../../components/RegisterForm';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('Registration form', () => {
  const props = {
    RegisterUser: jest.fn(() => {
      Promise.resolve();
    }),
    ...{ errors: {}, isLoading: false },
  };

  let state = {
    email: "jratcher@mail.com",
    password: "elmonstro",
    confirmPassword: 'elmonstro',
    username: 'elmonstro',
  };

  it('renders one registration form', () => {
    const wrapper = shallow(<ConnectedRegisterForm {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  it("submit button should be disabled when the user presses it", () => {
    const wrapper = shallow(<ConnectedRegisterForm {...props} />);
    const instance = wrapper.instance()
    const event = {
      preventDefault: jest.fn()
    };
    instance.handleSubmit(event);
    expect(props.RegisterUser).not.toHaveBeenCalled()
  })

  it('should call register when submit button is clicked', () => {
    const wrapper = mount(<ConnectedRegisterForm {...props} />);
    const instance = wrapper.instance()
    const event = {
      preventDefault: jest.fn()
    };

    instance.setState(state);
    instance.handleSubmit(event);
    expect(props.RegisterUser).toHaveBeenCalled()
  });

  it("register button should be disabled when the user presses it", () => {
    props.isLoading = true
    const wrapper = mount(<ConnectedRegisterForm {...props} />);
    const submitButton = wrapper.find('button')
    expect(submitButton.text()).toEqual('Loading...');

  })

  it("input classnames change when there are errors", () => {
    props.errors = {email: 'blah', username: 'blah blah', password: 'bleh', confirmPassword: 'bleh bleh'}
    const wrapper = mount(<ConnectedRegisterForm {...props} />);
    const errors = wrapper.find('.error')
    expect(errors.length).toEqual(8);
  })

  it("should show login form when change form span is clicked", () => {
    const wrapper = mount(<ConnectedRegisterForm {...props} />);
    const instance = wrapper.instance()
    const createSpy = toSpy => jest.spyOn(instance, toSpy);
    const swapForm = createSpy("swapForm");
    instance.forceUpdate();
    const span = wrapper.find('.swap-modal-span');
    span.simulate("click");
    expect(swapForm).toHaveBeenCalled();
  });

  it("should call handleFocus when input is focused", () => {
    const wrapper = mount(<ConnectedRegisterForm {...props} />);
    const instance = wrapper.instance()
    const createSpy = toSpy => jest.spyOn(instance, toSpy);
    const handleFocus = createSpy("handleFocus");
    instance.forceUpdate();
    const input = wrapper.find('#username').at(1);
    input.simulate("focus");
    expect(handleFocus).toHaveBeenCalled();
  });

  it("should call handleChange when input value is changed", () => {
    const wrapper = mount(<ConnectedRegisterForm {...props} />);
    const instance = wrapper.instance()
    const createSpy = toSpy => jest.spyOn(instance, toSpy);
    const handleChange = createSpy("handleChange");
    instance.forceUpdate();
    const input = wrapper.find('#username').at(1);
    input.simulate("change");
    expect(handleChange).toHaveBeenCalled();
  });

})

describe('MapDispatchToProps', () => { 
  const payload = { isRegister: true, modalShow: true }
  const dispatch = jest.fn()
  it('register user function is called', () => {
    mapDispatchToProps(dispatch).RegisterUser(payload);
    expect(dispatch).toHaveBeenCalled();
  });
});
