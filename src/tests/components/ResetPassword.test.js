import ResetPassword from '../../components/ResetPassword';
import { shallow } from 'enzyme';
import React from 'react';

describe('ResetPassword', () => {
  it('renders one Password reset component', () => {
    const props = {
      match: { params: { resetToken: 'fedageds' } }
    }
    const wrapper = shallow(<ResetPassword {...props} />);
    expect(wrapper).toHaveLength(1);
  });
})
