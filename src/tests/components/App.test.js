import React from 'react';
import { shallow, mount } from 'enzyme';
import Home from '../../components/Home';

describe('Home', () => {
  it('div tag displays correctly in "debug" mode', () => {
    const component = shallow(<Home debug />);
    expect(component.find('div')).toBeDefined();
  
  });
  it('H3 tag displays correctly in "debug" mode', () => {
    const component = shallow(<Home debug />);
    expect(component.find('div.h3')).toBeDefined();
  
  });
});
