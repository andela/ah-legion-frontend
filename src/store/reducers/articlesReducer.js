import { FETCH_ALL_ARTICLES } from '../actions/actionTypes';

const initialState = {
  articles: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    default:
      return state;
  }
}
