import React from 'react';
import { shallow } from 'enzyme';
import { oneArticle, sampleComments } from '../testData';
import AnArticle from '../../components/AnArticle';

const props = {
    article: oneArticle,
    comments: sampleComments
  };

describe('AnArticle tests', () => {
  const component = shallow(<AnArticle data={props}/>);
  const wrapperInstance = component.instance();
  it('confirm that an article is being rendered', () => {
    expect(component.find('div')).toBeDefined();
  });
  it('Should dispatch the dispatchReportArticle', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        dispatchReportArticle: jest.fn(),
        name: 'reportArticle'

      },
    };
    wrapperInstance.dispatchReportArticle(event);
  });
});
