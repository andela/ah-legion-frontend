import { BOOKMARKS_FETCHED, BOOKMARKED, NOT_BOOKMARKED } from '../actions/actionTypes';

const initialState = {
  bookmarks: [],
};

function bookmarkReducer(state = initialState, action) {
  if (action.type === BOOKMARKS_FETCHED) {
    return Object.assign({}, state, { bookmarks: state.bookmarks.concat(action.payload) });
  }
  if (action.type === BOOKMARKED) {
    return Object.assign({}, state, { bookmarks: state.bookmarks.concat(action.payload) });
  }
  if (action.type === NOT_BOOKMARKED) {
    return Object.assign({}, state, {
      bookmarks: state.bookmarks.filter(article => article.id !== action.payload.id),
    });
  }
  return state;
}

export default bookmarkReducer;
