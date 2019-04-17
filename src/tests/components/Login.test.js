import React from "react";
import { shallow } from "enzyme";
import Login from "../../components/Login";

describe("Login", () => {
  it("Should render correctly", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot;
  });
});
