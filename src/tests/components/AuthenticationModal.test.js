import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AuthenticationModal, { mapStateToProps } from '../../components/AuthenticationModal';
import { ConnectedAuthenticationModal } from '../../components/AuthenticationModal';
import store from '../../store/store';
import { Provider } from 'react-redux';


describe('AuthenticationModal', () => {
  it('renders one authentication modal', () => {
    const component = shallow(<AuthenticationModal/>);
      expect(component).toHaveLength(1);
  });

  it('renders authentication modal', () => {
    const component = shallow(<AuthenticationModal />);
    expect(component.find('div')).toBeDefined();
  });

  it('renders authentication modal in register mode', () => {
    const component = shallow(<ConnectedAuthenticationModal modalShow={true} component={'register'} dispatch={jest.fn()} />);
    expect(component.find('h3').text()).toEqual("Join Author's Haven")
  });

  it('renders authentication modal in login mode', () => {
    const component = shallow(<ConnectedAuthenticationModal modalShow={true} component={'login'} dispatch={jest.fn()} />);
    expect(component.find('h3').text()).toEqual("Welcome back")
  });

  it('renders authentication modal in Edit Comment mode', () => {
    const component = shallow(<ConnectedAuthenticationModal modalShow={true} component={'edit-comment'} dispatch={jest.fn()} />);
    expect(component.find('h3').text()).toEqual("Edit Comment")
  });

  it('renders authentication modal in initiate reset mode', () => {
    const component = shallow(<ConnectedAuthenticationModal modalShow={true} component={'initiate-reset'} dispatch={jest.fn()} />);
    expect(component.find('h3').text()).toEqual("Forgot your password?")
  });

  it('renders authentication modal in password reset mode', () => {
    const component = shallow(<ConnectedAuthenticationModal modalShow={true} component={'password-reset'} dispatch={jest.fn()} />);
    expect(component.find('h3').text()).toEqual("Create your new Password")
  });

  it('dispatches action when modal is hidden', () => {
    const dispatch = jest.fn()
    const component = mount(<Provider store={store}><ConnectedAuthenticationModal modalShow={true} component={''} dispatch={dispatch} /></Provider>);
    component.find('.close').simulate('click')
    expect(dispatch).toHaveBeenCalled()
  });
});

describe('MapStateToProps', () => { 
  const state = {modalState: { isRegister:true, modalShow: true }}
  const expected = { isRegister:true, modalShow: true }
  it('returns the modal state', () => {
    expect(mapStateToProps(state)).toEqual(expected)
  });
});
  
