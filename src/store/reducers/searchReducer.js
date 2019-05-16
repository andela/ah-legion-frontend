import {
  GET_SEARCH_RESULTS,
  SEARCH_UPDATE_AUTHOR,
  SEARCH_UPDATE_TITLE,
  SEARCH_UPDATE_TAGS,
  SEARCH_UPDATE_BODY,
  SEARCH_UPDATE_DESCRIPTION,
} from '../actions/actionTypes';

const initialState = {
  authorSearchResults: [],
  titleSearchResults: [],
  tagsSearchResults: [],
  bodySearchResults: [],
  descriptionSearchResults: [],
  authorCount: 0,
  titleCount: 0,
  tagsCount: 0,
  bodyCount: 0,
  descriptionCount: 0,
  authorHasNext: null,
  titleHasNext: null,
  tagsHasNext: null,
  bodyHasNext: null,
  descriptionHasNext: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        authorSearchResults: action.payload.author.results,
        titleSearchResults: action.payload.title.results,
        tagsSearchResults: action.payload.tags.results,
        bodySearchResults: action.payload.body.results,
        descriptionSearchResults: action.payload.description.results,
        authorCount: action.payload.author.count,
        titleCount: action.payload.title.count,
        tagsCount: action.payload.tags.count,
        bodyCount: action.payload.body.count,
        descriptionCount: action.payload.description.count,
        authorHasNext: action.payload.author.next,
        titleHasNext: action.payload.title.next,
        tagsHasNext: action.payload.tags.next,
        bodyHasNext: action.payload.body.next,
        descriptionHasNext: action.payload.description.next,
      };
    case SEARCH_UPDATE_AUTHOR:
      return {
        ...state,
        authorSearchResults: state.authorSearchResults.concat(action.payload.results),
        authorHasNext: action.payload.next,
      };
    case SEARCH_UPDATE_TITLE:
      return {
        ...state,
        titleSearchResults: state.titleSearchResults.concat(action.payload.results),
        titleHasNext: action.payload.next,
      };
    case SEARCH_UPDATE_TAGS:
      return {
        ...state,
        tagsSearchResults: state.tagsSearchResults.concat(action.payload.results),
        tagsHasNext: action.payload.next,
      };
    case SEARCH_UPDATE_BODY:
      return {
        ...state,
        bodySearchResults: state.bodySearchResults.concat(action.payload.results),
        bodyHasNext: action.payload.next,
      };
    case SEARCH_UPDATE_DESCRIPTION:
      return {
        ...state,
        descriptionSearchResults: state.descriptionSearchResults.concat(action.payload.results),
        descriptionHasNext: action.payload.next,
      };
    default:
      return state;
  }
};

export default searchReducer;
