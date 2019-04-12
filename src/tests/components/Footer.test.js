import { shallow } from 'enzyme';
import React from 'react';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders one Footer', () => {
    const component = shallow(<Footer />);
    expect(component).toHaveLength(1);
  });
});
