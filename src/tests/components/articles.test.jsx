import React from 'react';
import { shallow } from 'enzyme';
import { articles } from '../testData';
import Home from '../../components/Home';
import ArticlesByCriteria from '../../components/ArticlesByCriteria';
import AllArticles from '../../components/AllArticles';

describe('Home', () => {
  it('renders all divs, h3 and h2 correctly', () => {
    const component = shallow(<Home />);
    expect(component.find('div').length).toEqual(3);
    expect(component.find('h3').length).toEqual(1);
    expect(component.find('h2').length).toEqual(1);
  });
});

describe('ArticlesByCriteria ', () => {
  it('renders all articles correctly', () => {
    const component = shallow(<ArticlesByCriteria articles={articles} start={0} end={1} />);
    expect(component.find('div.home-view-last')).toBeDefined();
    expect(component.contains(<span className="author">Josh_Moracha</span>)).toBeTruthy();
    expect(component.find('div')).toHaveLength(1);
  });
});

describe('AllArticles ', () => {
  it('renders all articles correctly', () => {
    const component = shallow(<AllArticles articles={articles} />);
    expect(component.find('div.home-view-last')).toBeDefined();
    expect(component.contains(<span className="author">Josh_Moracha</span>)).toBeTruthy();
    expect(component.find('div')).toHaveLength(4);
  });
});
