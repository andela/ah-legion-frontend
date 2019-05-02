import { REPORT_SUCCESS, REPORT_FAILED } from '../actions/actionTypes';

export const initialState = {
  reportArticle: false,
};

const reportArticleReducers = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_SUCCESS:
      return {
        ...state,
        reportArticle: true,
      };
    case REPORT_FAILED:
      return {
        ...state,
        reportArticle: false,
      };
    default:
      return state;
  }
};

export default reportArticleReducers;
