import { PERSONAL_ARTICLES_FETCHED, ARTICLE_FETCH_FAILED } from '../actions/actionTypes';

const initialState = {
  personalArticles: [],
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PERSONAL_ARTICLES_FETCHED:
      return {
        ...state,
        personalArticles: action.payload,
      };
    case ARTICLE_FETCH_FAILED:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
