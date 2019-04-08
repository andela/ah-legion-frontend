import { shallow, mount } from "enzyme";
import Header from "../../components/Header";
import React from "react";
import { isLoggedIn } from '././../../utils/tokenValidator';

describe("Header", () => {
  const component = shallow(<Header />);
  const componentInstance = component.instance();
  const createSpy = toSpy => jest.spyOn(componentInstance, toSpy);
  it("renders one Header", () => {
    expect(component).toHaveLength(1);
  });
  it("calls the login modal when the login link is clicked", () => {
    const dispatchLogin = createSpy("dispatchLogin");
    componentInstance.forceUpdate();
    const login = component.find(".login");
    login.simulate("click");
    expect(dispatchLogin).toHaveBeenCalled();
  });
  it("calls the register modal when the register link is clicked", () => {
    const dispatchRegister = createSpy("dispatchRegister");
    componentInstance.forceUpdate();
    const register = component.find(".get-started");
    register.simulate("click");
    expect(dispatchRegister).toHaveBeenCalled();
  });
  it("shows profile icon dropdown when a user logs in", () => {

    component.setState({ LoggedIn: true})
    const profileDropdown = component.find(".profile-dropdown");
    expect(profileDropdown.length).toEqual(1);
    expect(component.find(".login").length).toEqual(0);
  });
});
