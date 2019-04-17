import { ConnectedInitiateResetForm, mapDispatchToProps, mapStateToProps } from '../../components/InitateResetForm';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('Initiate password Reset form', () => {
  const props = {
    InitiateReset: jest.fn(() => {
      Promise.resolve();
    }),
    ...{ isLoading: false },
  };

  let state = {
    email: 'jratcher@gmail.com',
    errors: {}
  };

  it('renders one initiate reset form', () => {
    const wrapper = shallow(<ConnectedInitiateResetForm {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  it('should call InitiateReset when submit button is clicked', () => {
    const wrapper = mount(<ConnectedInitiateResetForm {...props} />);
    const instance = wrapper.instance()
    const event = {
      preventDefault: jest.fn()
    };

    instance.setState(state);
    instance.handleSubmit(event);
    expect(props.InitiateReset).toHaveBeenCalled()
  });

  it('should show errors when email is invalid', () => {
    const wrapper = mount(<ConnectedInitiateResetForm {...props} />);
    const instance = wrapper.instance()
    const event = {
      preventDefault: jest.fn()
    };

    instance.setState({email: ''});
    instance.handleSubmit(event);
    const errorMsg = instance.state.errors.email
    expect(errorMsg).toBe("Email should contain at least one dot")
  });

  it("should call handleChange when input value is changed", () => {
    const wrapper = mount(<ConnectedInitiateResetForm {...props} />);
    const instance = wrapper.instance()
    const createSpy = toSpy => jest.spyOn(instance, toSpy);
    const handleChange = createSpy("handleChange");
    instance.forceUpdate();
    const input = wrapper.find('#email').at(1);
    input.simulate("change");
    expect(handleChange).toHaveBeenCalled();
  });

  it("Continue button should be disabled when the user presses it", () => {
    props.isLoading = true
    const wrapper = mount(<ConnectedInitiateResetForm {...props} />);
    const submitButton = wrapper.find('button')
    expect(submitButton.text()).toEqual('Loading...');

  })

});

describe('MapToProps', () => { 
  const payload = { isRegister: true, modalShow: true }
  const dispatch = jest.fn()
  it('should call dispatch', () => {
    mapDispatchToProps(dispatch).InitiateReset(payload);
    expect(dispatch).toHaveBeenCalled();
  });
  it('should return new state', () => {
    const newState = mapStateToProps({ resetPasswordState: { isLoading: true } });
    const expected = { isLoading: true };
    expect(newState).toEqual(expected)
  })
});
