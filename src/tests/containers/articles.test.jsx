import React from 'react';
import { shallow } from 'enzyme';
import { containerArticles, articles } from '../testData';
import { HomeView, mapStateToProps } from '../../containers/HomeView';
import Home from '../../components/Home';

describe('HomeView', () => {
  it('renders all divs, h3 and h2 correctly', () => {
    const component = shallow(<HomeView articles={containerArticles} />);
    expect(component.contains(<Home />)).toBeTruthy();
  });
});
describe('HomeView map props to state', () => {
  it('should return the initial state', () => {
    expect(mapStateToProps({ articles })).toEqual(
      {
        articles,
      },
    );
  });
});
