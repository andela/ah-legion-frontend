import { shallow, mount } from 'enzyme';
import Header from '../../components/Header';
import React from 'react';

describe('Header', () => {
  it('renders one Header', () => {
    const component = shallow(<Header />);
    expect(component).toHaveLength(1);
  });
});
