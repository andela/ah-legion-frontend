import React from 'react';
import { shallow } from 'enzyme';
import { oneArticle, sampleComments, viewAnArticleStateToProps } from '../testData';
import { GetAnArticle, mapDispatchToProps, mapStateToProps } from '../../containers/GetAnArticle';


describe('GetAnArticle tests', () => {
  const props = {
    isFetchingArticle: false,
    isFetchingComments: false,
    isLoggedIn: false,
    article: oneArticle,
    errors: "",
    comments: sampleComments,
    fetchTheArticle: jest.fn(),
    fetchTheArticleComments: jest.fn(),
    hasLiked: false,
    likeState: false,
    likeID: -1,
    totalLikes: 0,
    totalDislikes: 0,
    getAllLikes: jest.fn(),
    getUserLikeStatus: jest.fn(),
    dispatchCreateLike: jest.fn(),
    dispatchUpdateLike: jest.fn(),
    dispatchDeleteLike: jest.fn(),
    isLoggedIn: true,
    match: {
        params: {
          slug: "ukweli"
        }
    }
  }
  const component = shallow(<GetAnArticle {...props}/>);
  const wrapperInstance = component.instance();
  it("Should mount GetAnArticle", () => {
      expect(component.find('.an-article')).toHaveLength(1);
   })
   it("Loading should be displayed when fetching articles", () => {
    const props = {
        isFetchingArticle: true,
        match: {
          params: {
            slug: "ukweli"
          }
        }
    }
      const component = shallow(<GetAnArticle {...props}/>);
      expect(component.find('.article-loading').text()).toEqual('Loading...');
   })
   it('Should dispatch the handleLiking', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        id: 'likeButton',
      },
    };
    wrapperInstance.handleLiking(event);
    expect(wrapperInstance.props.likeState).toEqual(false);
  });
  it('Should dispatch the handleLiking unlikebutton', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        id: 'unlikeButton',
      },
    };
    wrapperInstance.forceUpdate();
    wrapperInstance.handleLiking(event);
    expect(wrapperInstance.props.isLoggedIn).toEqual(true);
  });
  it('Should dispatch the handleLiking logged in false', () => {
    component.setProps({
      isLoggedIn: false
    })
    const event = {
      preventDefault: jest.fn(),
      target: {
        id: 'unlikeButton',
      },
    };
    wrapperInstance.forceUpdate();
    wrapperInstance.handleLiking(event);
    expect(wrapperInstance.props.isLoggedIn).toEqual(false);
  });
  it('Should dispatch the handleLiking situation hasLiked && likeState should be true', () => {
    component.setProps({
      isLoggedIn: true,
      hasLiked: true,
      likeState: true,
    })
    const event = {
      preventDefault: jest.fn(),
      target: {
        id: 'unlikeButton',
      },
    };
    wrapperInstance.forceUpdate();
    wrapperInstance.handleLiking(event);
    expect(wrapperInstance.props.likeState).toEqual(true);
  });
  it('Should dispatch the handleLiking situation hasLiked=true and likeState=false', () => {
    component.setProps({
      isLoggedIn: true,
      hasLiked: true,
      likeState: false,
    })
    const event = {
      preventDefault: jest.fn(),
      target: {
        id: 'likeButton',
      },
    };
    wrapperInstance.forceUpdate();
    wrapperInstance.handleLiking(event);
    expect(wrapperInstance.props.likeState).toEqual(false);
  });
  it('Should dispatch the handleLikeClicked delete', () => {
    component.setProps({
      hasLiked: true,
      likeState: true,
    })
    wrapperInstance.forceUpdate();
    wrapperInstance.handleLikeClicked();
    expect(wrapperInstance.props.likeState).toEqual(true);
  });
  it('Should dispatch the handleLikeClicked false return', () => {
    component.setProps({
      hasLiked: true,
      likeState: false,
    })
    wrapperInstance.forceUpdate();
    wrapperInstance.handleLikeClicked(false);
    expect(wrapperInstance.props.likeState).toEqual(false);
  });
  it('Should dispatch the handleDislikeClicked delete', () => {
    component.setProps({
      hasLiked: true,
      likeState: false,
    })
    wrapperInstance.forceUpdate();
    wrapperInstance.handleDislikeClicked();
    expect(wrapperInstance.props.likeState).toEqual(false);
  });
  it('Should dispatch the handleDislikeClicked false return', () => {
    component.setProps({
      hasLiked: true,
      likeState: true,
    })
    wrapperInstance.forceUpdate();
    wrapperInstance.handleDislikeClicked(false);
    expect(wrapperInstance.props.likeState).toEqual(true);
  });
   it("Errors should be displayed when fetching articles", () => {
    const props = {
        errors: true,
        match: {
          params: {
            slug: "ukweli"
          }
        }
    }
      const component = shallow(<GetAnArticle {...props}/>);
      expect(component.find('.article-errors').text()).toEqual('Return 404...');
   })
   it("comments-loading should be displayed when fetching comments", () => {
    const props = {
        isFetchingComments: true,
        match: {
          params: {
            slug: "ukweli"
          }
        }
    }
      const component = shallow(<GetAnArticle {...props}/>);
      expect(component.find('.comments-loading').text()).toEqual('Loading...');
   })
});

describe('MapDispatchToProps', () => { 
  const dispatch = jest.fn()
  it('should dispatch fetchTheArticle', () => {
    mapDispatchToProps(dispatch).fetchTheArticle();
    expect(dispatch).toHaveBeenCalled();
  });
  it('should dispatch fetchTheArticleComments', () => {
    mapDispatchToProps(dispatch).fetchTheArticleComments();
    expect(dispatch).toHaveBeenCalled();
  });
  it('should dispatch getAllLikes', () => {
    mapDispatchToProps(dispatch).getAllLikes();
    expect(dispatch).toHaveBeenCalled();
  });
  it('should dispatch getUserLikeStatus', () => {
    mapDispatchToProps(dispatch).getUserLikeStatus();
    expect(dispatch).toHaveBeenCalled();
  });
  it('should dispatch dispatchCreateLike', () => {
    mapDispatchToProps(dispatch).dispatchCreateLike();
    expect(dispatch).toHaveBeenCalled();
  });
  it('should dispatch dispatchUpdateLike', () => {
    mapDispatchToProps(dispatch).dispatchUpdateLike();
    expect(dispatch).toHaveBeenCalled();
  });
  it('should dispatch dispatchDeleteLike', () => {
    mapDispatchToProps(dispatch).dispatchDeleteLike();
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('MapStateToProps', () => { 
  const state = {
    getCommentsReducer: {
      comments: [],
      article: {},
      errors: '',
      author: '',
      isFetchingArticle: [],
      isFetchingComments: [],
      changedCommentData:{
        Comment: {},
      }
    },
    loginUser:{
      loggedIn: true,
    },
    likeArticleState:{
      hasLiked: false,
      likeState: false,
      likeID: -1,
      totalLikes: 0,
      totalDislikes: 0,

    }
  };
  it('returns the comments state', () => {
    expect(mapStateToProps(state)).toEqual(viewAnArticleStateToProps);
  });
});

