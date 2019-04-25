import React from 'react';
import { mount, shallow } from 'enzyme';
import { TwitterLogin, mapDispatchToProps, mapStateToProps } from '../../components/TwitterLogin';


describe('Twitter Component', () => {
  it("Should render with no errors", () => {
      const component = shallow(<TwitterLogin />);
      expect(component.find('button')).toBeDefined();
      expect(component.length).toBe(1);
  })

  it("Should render with no errors", () => {
    const component = shallow(<TwitterLogin component='register' />);
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

describe('MapStateToProps', () => { 
  const state = {modalState: { component: 'register', modalShow: true }}
  const expected = { component: 'register'}
  it('returns the modal state', () => {
    expect(mapStateToProps(state)).toEqual(expected)
  });
});
