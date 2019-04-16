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
    const component = shallow(<ConnectedAuthenticationModal modalShow={true} isRegister={true} dispatch={jest.fn()} />);
    expect(component.find('h3').text()).toEqual("Join Author's Haven")
  });

  it('renders authentication modal in login mode', () => {
    const component = shallow(<ConnectedAuthenticationModal modalShow={true} isRegister={false} dispatch={jest.fn()} />);
    expect(component.find('h3').text()).toEqual("Welcome back")
  });

  it('dispatches action when modal is hidden', () => {
    const dispatch = jest.fn()
    const component = mount(<Provider store={store}><ConnectedAuthenticationModal modalShow={true} isRegister={true} dispatch={dispatch} /></Provider>);
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
  
