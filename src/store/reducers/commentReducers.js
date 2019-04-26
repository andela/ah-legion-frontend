import {
  FETCH_AN_ARTICLE,
  FETCH_ARTICLE_COMMENTS,
  FETCH_AN_ARTICLE_404,
  CREATE_COMMENT_SUCCESS,
  CREATE_REPLY_SUCCESS,
  LOGGED_IN,
  DELETED_COMMENT,
  EDITED_COMMENT,
  FINISH_DELETE,
  FINISH_EDIT,
} from '../actions/actionTypes';

const initialState = {
  isFetchingArticle: true,
  isFetchingComments: true,
  commentCreated: false,
  replyCreated: false,
  creatingComment: true,
  creatingReply: true,
  createCommentError: false,
  isLoggedIn: false,
  deletedComment: false,
  deletedCommentId: false,
  changedComment: false,
  changedCommentData: '',
  slug: '',
  errors: null,
  author: {},
  comments: [],
  newComment: {},
  newReply: {},
};

const commentsReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AN_ARTICLE:
      return {
        ...state,
        slug: action.payload.slug,
        article: action.payload,
        isFetchingArticle: false,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        commentCreated: true,
        newComment: action.payload,
      };
    case LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case DELETED_COMMENT:
      return {
        ...state,
        deletedComment: true,
        deletedCommentId: action.payload,
      };
    case EDITED_COMMENT:
      return {
        ...state,
        changedComment: true,
        changedCommentData: action.payload,
      };
    case FINISH_DELETE:
      return {
        ...state,
        deletedComment: false,
      };
    case FINISH_EDIT:
      return {
        ...state,
        changedComment: false,
      };
    case CREATE_REPLY_SUCCESS:
      return {
        ...state,
        replyCreated: true,
        newReply: action.payload,
      };
    case FETCH_AN_ARTICLE_404:
      return {
        ...state,
        errors: action.payload,
        isFetchingArticle: false,
      };

    case FETCH_ARTICLE_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        isFetchingComments: false,
      };
    default:
      return state;
  }
};

export default commentsReducers;
