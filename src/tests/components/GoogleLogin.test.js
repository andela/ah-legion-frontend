import React from 'react';
import { mount, shallow } from 'enzyme';
import { GoogleLogin, mapDispatchToProps } from '../../components/GoogleLogin';
import { Button } from 'react-bootstrap';


describe('Google Login component', () => {
  it("Should render with no errors", () => {
    const component = shallow(<GoogleLogin />);
    expect(component.find('button')).toBeDefined();
    expect(component.length).toBe(1);
  })

  it("Should render with button", () => {
    const component = shallow(<GoogleLogin isRegister={true} />);
    const button = component.find('button');
    expect(component.length).toBe(1);
  })

  it("Should callfunction when button is clicked", () => {
    const mockFn = jest.fn()
    const props = {
      googleLogin: mockFn
    }
    const component = mount(<GoogleLogin  {...props} />);
    const button = component.find('.google').first().simulate('click');
    console.log(button);
    expect(mockFn.mock.calls.length).toBe(1)
  })
});

describe('MapDispatchToProps', () => { 
    const dispatch = jest.fn()
    it('should dispatch googleLogin', () => {
      mapDispatchToProps(dispatch).googleLogin();
      expect(dispatch).toHaveBeenCalled();
    });
  });
  