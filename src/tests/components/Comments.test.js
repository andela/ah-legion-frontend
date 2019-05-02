import React from 'react';
import { shallow } from 'enzyme';
import { oneArticle, sampleComments, commentsProps } from '../testData';
import { Comments, mapDispatchToProps, mapStateToProps } from '../../components/Comments';


const props = {
    article: oneArticle,
    comments: sampleComments,
    createComment: jest.fn(),
    changedComment:true,
    changedCommentData:sampleComments[0],
    createReply: jest.fn()
  };

  const comment = {
      Comment:sampleComments[0]
  }

  const createComment =  jest.fn() 
describe('Comments tests', () => {
    const component = shallow(<Comments data={props} {...props}/>);
    component.setProps({
      comments: sampleComments,
      isLoggedIn: true,
      newComment:comment,
      deletedCommentId:sampleComments[0].id, 
      createComment:createComment, 
      changedComment:true,
      changedCommentData:sampleComments[0], 
      data: {
        deletedComment: sampleComments[0],
        deletedCommentId:sampleComments[0].id,
      },
    })
    const wrapperInstance = component.instance();
    it('confirm that a comment component is mounted', () => {
      expect(component.find('.my-comments')).toHaveLength(1);
    });
    it('Should dispatch the handleSubmitComment', () => {
      const event = {
        preventDefault: jest.fn(),
        target: {
          handleSubmitComment: jest.fn(),
        },
      };
      const state = {
        thisComment: '',
      };
      wrapperInstance.setState(state);
      wrapperInstance.handleSubmitComment(event);
      expect(wrapperInstance.state.thisComment).toEqual('')
    });
    it('Should dispatch the dispatchEditComment', () => {
      const event = {
        preventDefault: jest.fn(),
        target: {
          dispatchEditComment: jest.fn(),
          name: 'article-34'

        },
      };
      const state = {
        thisId: '',
      };
      wrapperInstance.forceUpdate();
      wrapperInstance.setState(state);
      wrapperInstance.dispatchEditComment(event);
      expect(wrapperInstance.state.thisId).toEqual("")
    });
    it('Should dispatch the dispatchDeleteComment', () => {
      const event = {
        preventDefault: jest.fn(),
        target: {
          dispatchDeleteComment: jest.fn(),
          name: 'article-34'
        },
      };
      const state = {
        replyId: 'article-34',
      };
      wrapperInstance.setState(state);
      wrapperInstance.dispatchDeleteComment(event);
      expect(wrapperInstance.state.replyId).toEqual("article-34")
    });
    it('Should dispatch the handleChange', () => {
      const event = {
        preventDefault: jest.fn(),
        target: {
          handleChange: jest.fn(),
          name: 'thisComment'
        },
      };
      const state = {
        replyId: 'thisComment',
      };
      const wrapperInstance = component.instance();
      wrapperInstance.setState(state);
      wrapperInstance.handleChange(event);
      expect(wrapperInstance.state.replyId).toEqual("thisComment")
      });
    const component1 = shallow(<Comments data={props} {...props}/>);
    it('Should dispatch the handleSubmitReply', () => {
      const event = {
        preventDefault: jest.fn(),
        target: {
          handleSubmitReply: jest.fn(),
          name: 'article-34'
        },
      };
      const state = {
        replyId: 'article-34',
      };
      const wrapperInstance = component1.instance();
      wrapperInstance.setState(state);
      wrapperInstance.handleSubmitReply(event);
      expect(wrapperInstance.state.replyId).toEqual("article-34")
    });
  });

  describe('Comments reply test', () => {
    const component = shallow(<Comments data={props} {...props}/>);
    component.setProps({
      comments: sampleComments,
      isLoggedIn: true,
      newComment:comment,
      createComment:createComment, 
      changedComment:true,
      changedCommentData:sampleComments[0], 
      data: {
        newReply: {
          Comment: sampleComments[0]
        }, 
      },
    })
    const wrapperInstance = component.instance();
    it('confirm that a comment component is mounted', () => {
      expect(component.find('.my-comments')).toHaveLength(1);
    });
  });
  describe('Comments make a comment', () => {
    const component = shallow(<Comments data={props} {...props}/>);
    component.setProps({
      comments: sampleComments,
      isLoggedIn: true,
      createComment:createComment, 
      changedComment:true,
      changedCommentData:sampleComments[0], 
      data: {
        newComment: {
          Comment: sampleComments[0]
        }, 
      },
    })
    const wrapperInstance = component.instance();
    it('confirm that a comment component is mounted', () => {
      expect(component.find('.my-comments')).toHaveLength(1);
    });
  });
  describe('MapDispatchToProps', () => { 
    const dispatch = jest.fn()
    it('should dispatch createComment', () => {
      mapDispatchToProps(dispatch).createComment();
      expect(dispatch).toHaveBeenCalled();
    });
    it('should dispatch createReply', () => {
      mapDispatchToProps(dispatch).createReply();
      expect(dispatch).toHaveBeenCalled();
    });
    it('should dispatch fetchTheArticleComments', () => {
      mapDispatchToProps(dispatch).fetchTheArticleComments();
      expect(dispatch).toHaveBeenCalled();
    });
  });
  describe('MapStateToProps', () => { 
    const state = {
      getCommentsReducer: {
        comments: sampleComments,
        thisComment: sampleComments[0],
        changedComment: sampleComments[0],
        changedCommentData:{
          Comment: sampleComments[0],
        }
      },
      loginUser:{
        loggedIn: true,
      }
    };
    it('returns the comments state', () => {
      expect(mapStateToProps(state)).toEqual(commentsProps)
    });
  });

