import React from 'react';
import { mount, shallow } from 'enzyme';
import { FacebookLogin , mapDispatchToProps, mapStateToProps } from '../../components/FacebookLogin';


describe('GoogleComponent', () => {
  it("Should render with no errors", () => {
      const component = shallow(<FacebookLogin />);
      expect(component.find('button')).toBeDefined();
      expect(component.length).toBe(1);
  })

  it("Should render with button", () => {
      const component = shallow(<FacebookLogin component='register' />);
      const button = component.find('button');
      expect(component.length).toBe(1);
  })

  it("Should render with button", () => {
    const mockFn = jest.fn()
    const props = {
      facebookLogin: mockFn
    }
    const component = mount(<FacebookLogin  {...props} />);
    const button = component.find('.facebook').first().simulate('click');
    console.log(button);
    expect(mockFn.mock.calls.length).toBe(1)
  })
});

describe('MapDispatchToProps', () => { 
  const dispatch = jest.fn()
  it('should dispatch facebookLogin', () => {
    mapDispatchToProps(dispatch).facebookLogin();
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('MapStateToProps', () => { 
  const state = {modalState: { component: 'register', modalShow: true }}
  const expected = { component: 'register'}
  it('returns the modal state', () => {
    expect(mapStateToProps(state)).toEqual(expected)
  });
});
