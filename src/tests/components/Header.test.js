import { shallow } from "enzyme";
import { Header } from "../../components/Header";
import React from "react";

describe("Header", () => {
  const props = {
    loggedIn: false,
  }
  const component = shallow(<Header {...props}/>);
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
  it("the header updates when the user logs out", () => {
    const props = {
      loggedIn: true,
    }
    const wrapper = shallow(<Header {...props} />)
    const wrapperInstance = wrapper.instance();
    const dispatchLogout = createSpy("dispatchLogout");
    wrapperInstance.forceUpdate();
    const logout = wrapper.find(".logout");
    logout.simulate("click");
  });
})

describe('Header when a user logs in', () => {
  it("shows profile icon dropdown when a user logs in", () => {
    const props = {
      loggedIn: true
    }
    const wrapper = shallow(<Header {...props} />)

    const logout = wrapper.find(".logout");
    expect(logout.length).toEqual(1);
    expect(wrapper.find(".login").length).toEqual(0);
  });
});

