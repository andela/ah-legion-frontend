import { ConnectedResetPassword } from '../../components/ResetPassword';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { mapStateToProps } from '../../components/ResetPassword';

describe('ResetPassword', () => {
  it('renders one Password reset component', () => {
    const props = {redirect: true}
    const wrapper = shallow(<ConnectedResetPassword {...props}/>);
    expect(wrapper).toHaveLength(1);
  });
  it('redirects when redirect is true', () => {
    const props = {redirect: true}
    const wrapper = shallow(<ConnectedResetPassword {...props}/>);
    expect(wrapper).toHaveLength(1);
  });
})

describe('MapToProps', () => { 
  it('should return new state', () => {
    const newState = mapStateToProps({ resetPasswordState: { redirect: true } });
    const expected = { redirect: true };
    expect(newState).toEqual(expected)
  })
});
 