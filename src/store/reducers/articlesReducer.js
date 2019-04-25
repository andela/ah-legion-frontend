import {
  FETCH_ALL_ARTICLES,
  CREATE_ARTICLE,
  FETCH_ARTICLES_BY_AUTHOR,
  EDIT_ARTICLE,
  FETCH_ALL_ARTICLES_FAIL,
  CREATE_ARTICLE_FAIL,
  FETCH_ARTICLES_BY_AUTHOR_FAIL,
  EDIT_ARTICLE_FAIL,
  PUBLISH_ARTICLE,
  PUBLISH_ARTICLE_FAIL,
  VIEW_ARTICLES,
  IS_LOADING,
} from '../actions/actionTypes';

export const initialState = {
  articles: [],
  article: [],
  authorArticles: [],
  editedArticle: [],
  publishedArticle: [],
  results: [],
  loading: false,
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
    case CREATE_ARTICLE:
      return {
        ...state,
        article: action.article,
      };
    case CREATE_ARTICLE_FAIL:
      return {
        ...state,
        article: action.error,
      };
    case FETCH_ARTICLES_BY_AUTHOR:
      return {
        ...state,
        authorArticles: action.authorArticles,
      };
    case FETCH_ARTICLES_BY_AUTHOR_FAIL:
      return {
        ...state,
        authorArticles: action.error,
      };
    case EDIT_ARTICLE:
      return {
        ...state,
        editedArticle: action.editedArticle,
      };
    case EDIT_ARTICLE_FAIL:
      return {
        ...state,
        editedArticle: action.error,
      };
    case PUBLISH_ARTICLE:
      return {
        ...state,
        publishedArticle: action.publishedArticle,
      };
    case PUBLISH_ARTICLE_FAIL:
      return {
        ...state,
        publishedArticle: action.error,
      };
    case VIEW_ARTICLES:
      return {
        ...state,
        results: state.results.concat(action.payload.results),
      };
    case IS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
