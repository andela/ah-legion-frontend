import { shallow } from 'enzyme';
import React from 'react';
import { Header } from '../../components/Header';

describe('Header', () => {
  const loginUser = { loggedIn: false };
  const component = shallow(<Header loginUser={loginUser} />);
  const componentInstance = component.instance();
  const createSpy = toSpy => jest.spyOn(componentInstance, toSpy);
  it('renders one Header', () => {
    expect(component).toHaveLength(1);
  });

  it('calls the login modal when the login link is clicked', () => {
    const dispatchLogin = createSpy('dispatchLogin');
    componentInstance.forceUpdate();
    const login = component.find('.login');
    login.simulate('click');
    expect(dispatchLogin).toHaveBeenCalled();
  });
  it('calls the register modal when the register link is clicked', () => {
    const dispatchRegister = createSpy('dispatchRegister');
    componentInstance.forceUpdate();
    const register = component.find('.get-started');
    register.simulate('click');
    expect(dispatchRegister).toHaveBeenCalled();
  });
  it('shows profile icon dropdown when a user logs in', () => {
    component.setState({ LoggedIn: true });
    const profileDropdown = component.find('.user-profile-container');
    expect(profileDropdown).toBeDefined();
  });

  it('calls the dispath logout method ', () => {
    const spy = jest.spyOn(component.instance(), 'dispatchLogout');
    component.instance().dispatchLogout();
    expect(spy).toHaveBeenCalled();
  });
});
