import {
  FETCH_TOTAL_LIKES,
  HAS_REACTION,
  REMOVE_REACTION,
} from '../actions/actionTypes';

const initialState = {
  hasLiked: false,
  likeState: false,
  likeID: -1,
  totalLikes: 0,
  totalDislikes: 0,
};

const likeReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOTAL_LIKES:
      return {
        ...state,
        totalLikes: action.payload.total_likes,
        totalDislikes: action.payload.total_dislikes,
      };
    case HAS_REACTION:
      return {
        ...state,
        hasLiked: true,
        likeState: action.payload.is_like,
        likeID: action.payload.id,
      };
    case REMOVE_REACTION:
      return {
        ...state,
        hasLiked: false,
        likeState: false,
        likeID: -1,
      };
    default:
      return state;
  }
};

export default likeReducers;
