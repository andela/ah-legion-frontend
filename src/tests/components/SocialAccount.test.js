import React from 'react';
import { shallow } from 'enzyme';
import SocialAccount from '../../components/SocialAccount';


describe('Social Account component', () => {

  it("Should have correct state", () => {
    const component = shallow(<SocialAccount />);
    expect(component.length).toBe(1);    
  });
});
