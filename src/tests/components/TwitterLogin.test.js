import React from 'react';
import { mount, shallow } from 'enzyme';
import { TwitterLogin, mapDispatchToProps } from '../../components/TwitterLogin';


describe('Twitter Component', () => {
  it("Should render with no errors", () => {
      const component = shallow(<TwitterLogin />);
      expect(component.find('button')).toBeDefined();
      expect(component.length).toBe(1);
  })

  it("Should render with no errors", () => {
    const component = shallow(<TwitterLogin isRegister={true} />);
    expect(component.find('button')).toBeDefined();
    expect(component.length).toBe(1);
  })

  it("Should render with button", () => {
      const mockFn = jest.fn()
      const props = {
        twitterLogin: mockFn
      }
      const component = mount(<TwitterLogin  {...props} />);
      const button = component.find('.twitter').first().simulate('click');
      expect(mockFn.mock.calls.length).toBe(1)
  })
});

describe('MapDispatchToProps', () => { 
  const dispatch = jest.fn()
  it('should dispatch twitterLogin', () => {
    mapDispatchToProps(dispatch).twitterLogin();
    expect(dispatch).toHaveBeenCalled();
  });
});
