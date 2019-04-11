import React from 'react';
import { shallow, mount } from 'enzyme';
import { oneArticle, sampleComments } from '../testData';
import { EditCommentForm } from '../../components/EditCommentForm';

const props = {
  isLoading: true,
  editData:{},
  editComment: jest.fn(),
  EditCommentForm: jest.fn(() => {
    Promise.resolve();
  }),
  ...{ errors: {}, isLoading: false },
};

describe('Edit comment form tests', () => {
  const component = shallow(<EditCommentForm {...props}/>);
  component.setProps({
    editData: "wa are the",
    editComment: jest.fn()
  })
  const wrapperInstance = component.instance();
  it('confirm that a comment component is mounted', () => {
    expect(component.find('div')).toBeDefined();
  });
  it('Should dispatch the editComment', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        editComment: jest.fn(),
        name: 'article-34'
      },
    };
    const state = {
      replyId: 'article-34',
    };
    const wrapperInstance = component.instance();
    wrapperInstance.setState(state);
    wrapperInstance.editComment(event);
    expect(wrapperInstance.state.replyId).toEqual("article-34")
  });
  it('Should dispatch the handleChange', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        handleChange: jest.fn(),
        name: 'article-34'
      },
    };
    const state = {
      replyId: 'article-34',
    };
    const wrapperInstance = component.instance();
    wrapperInstance.setState(state);
    wrapperInstance.handleChange(event);
    expect(wrapperInstance.state.replyId).toEqual("article-34")
  });
});

