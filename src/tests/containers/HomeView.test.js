import React from 'react';
import { shallow } from 'enzyme';
import HomeView, { mapDispatchToProps } from '../../containers/HomeView';

describe('Home View  container', () => {
  it("Should have correct state", () => {
    const component = shallow(<HomeView />);
    expect(component.length).toBe(1);
  });
});
 
