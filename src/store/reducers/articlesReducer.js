import { FETCH_ALL_ARTICLES, FETCH_ALL_ARTICLES_FAIL } from '../actions/actionTypes';

export const initialState = {
  articles: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    case FETCH_ALL_ARTICLES_FAIL:
      return {
        ...state,
        articles: action.error,
      };
    default:
      return state;
  }
}
