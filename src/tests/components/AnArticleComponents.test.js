import React from 'react';
import { shallow } from 'enzyme';
import { oneArticle, sampleComments } from '../testData';
import AnArticle from '../../components/AnArticle';

const props = {
    article: oneArticle,
    comments: sampleComments
  };

describe('AnArticle tests', () => {
  it('confirm that an article is being rendered', () => {
    const component = shallow(<AnArticle data={props}/>);
    expect(component.find('div')).toBeDefined();
  });
});
