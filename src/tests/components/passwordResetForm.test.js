import { ConnectedPasswordResetForm, mapDispatchToProps, mapStateToProps } from '../../components/PasswordResetForm';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('Reset password Reset form', () => {
  const props = {
    PasswordReset: jest.fn(() => {
      Promise.resolve();
    }),
    ...{ isLoading: false, token: 'blahblah'},
  };

  let state = {
    confirmPassword: '12345678',
    password: '12345678',
    errors: {},
  };

  it('renders one password form', () => {
    const wrapper = shallow(<ConnectedPasswordResetForm {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  it('should call InitiateReset when submit button is clicked', () => {
    const wrapper = mount(<ConnectedPasswordResetForm {...props} />);
    const instance = wrapper.instance()
    const event = {
      preventDefault: jest.fn()
    };

    instance.setState(state);
    instance.handleSubmit(event);
    expect(props.PasswordReset).toHaveBeenCalled()
  });

  it('should show errors when passwords is invalid', () => {
    const wrapper = mount(<ConnectedPasswordResetForm {...props} />);
    const instance = wrapper.instance()
    const event = {
      preventDefault: jest.fn()
    };

    instance.setState({password: ''});
    instance.handleSubmit(event);
    const errorMsg = instance.state.errors.password
    expect(errorMsg).toBe("Password should be at least 8 characters long")
  });

  it('should show errors when passwords are not equal', () => {
    const wrapper = mount(<ConnectedPasswordResetForm {...props} />);
    const instance = wrapper.instance()
    const event = {
      preventDefault: jest.fn()
    };

    instance.setState({password:'fsbdgbhndss', ConfirmPassword: 'vtbgrw'});
    instance.handleSubmit(event);
    const errorMsg = instance.state.errors.confirmPassword
    expect(errorMsg).toBe("Passwords do not match")
  });

  it("should call handleChange when input value is changed", () => {
    const wrapper = mount(<ConnectedPasswordResetForm {...props} />);
    const instance = wrapper.instance()
    const createSpy = toSpy => jest.spyOn(instance, toSpy);
    const handleChange = createSpy("handleChange");
    instance.forceUpdate();
    const input = wrapper.find('#password').at(1);
    input.simulate("change");
    expect(handleChange).toHaveBeenCalled();
  });

  it("Continue button should be disabled when the user presses it", () => {
    props.isLoading = true
    const wrapper = mount(<ConnectedPasswordResetForm {...props} />);
    const submitButton = wrapper.find('button')
    expect(submitButton.text()).toEqual('Loading...');

  })

});

describe('MapToProps', () => { 
  const payload = { isRegister: true, modalShow: true }
  const dispatch = jest.fn()
  it('should call dispatch', () => {
    mapDispatchToProps(dispatch).PasswordReset(payload);
    expect(dispatch).toHaveBeenCalled();
  });
  it('should return new state', () => {
    const newState = mapStateToProps({ resetPasswordState: { isLoading: true } });
    const expected = { isLoading: true };
    expect(newState).toEqual(expected)
  })
});
