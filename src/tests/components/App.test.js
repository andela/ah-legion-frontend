import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../../components/App';
describe('App', () => {
  it('div tag displays correctly in "debug" mode', () => {
    const component = shallow(<App debug />);
    expect(component.find('div')).toBeDefined();
  
  });
  it('H3 tag displays correctly in "debug" mode', () => {
    const component = shallow(<App debug />);
    expect(component.find('div.h3')).toBeDefined();
  
  });
});
