import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import axiosConfig, { axiosConfigAuth } from '../../axiosConfig';
import {
  fetchAllArticles,
  fetchAllArticlesByAuthor,
  createAnArticle,
  editAnArticle,
  publishAnArticle,
} from '../../store/actions/articles';
import {
  CREATE_ARTICLE,
  FETCH_ARTICLES_BY_AUTHOR,
  EDIT_ARTICLE,
  FETCH_ALL_ARTICLES_FAIL,
  CREATE_ARTICLE_FAIL,
  FETCH_ARTICLES_BY_AUTHOR_FAIL,
  EDIT_ARTICLE_FAIL,
  PUBLISH_ARTICLE,
  PUBLISH_ARTICLE_FAIL,
} from '../../store/actions/actionTypes';
import { articles, article } from '../testData';
import { mapStateToProps } from '../../containers/CreateArticleView';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore();

describe('async actions', () => {
  beforeEach(() => {
    moxios.install(axiosConfig);
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall(axiosConfig);
  });
  it('dispatches FETCH_ALL_ARTICLES', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: articles.data,
      });
    });
    const expectedActionTypes = [FETCH_ALL_ARTICLES_FAIL];

    return store.dispatch(fetchAllArticles()).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(
        action => action.type,
      );

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });
  it('dispatches FETCH_ALL_ARTICLES_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: articles.data,
      });
    });
    const expectedActionTypes = [FETCH_ALL_ARTICLES_FAIL];

    return store.dispatch(fetchAllArticles()).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(
        action => action.type,
      );

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });
});

describe('async actions', () => {
  beforeEach(() => {
    moxios.install(axiosConfigAuth);
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall(axiosConfigAuth);
  });

  it('dispatches CREATE_ARTICLE', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: article.data,
      });
    });
    const expectedActionTypes = [CREATE_ARTICLE];

    return store.dispatch(createAnArticle({})).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(
        action => action.type,
      );

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });
  it('dispatches CREATE_ARTICLE_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: article.data,
      });
    });
    const expectedActionTypes = [CREATE_ARTICLE_FAIL];

    return store.dispatch(createAnArticle({})).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(
        action => action.type,
      );

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });

  it('dispatches EDIT_ARTICLE', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: article.data,
      });
    });
    const expectedActionTypes = [EDIT_ARTICLE];

    return store.dispatch(editAnArticle({})).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(
        action => action.type,
      );

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });
  it('dispatches EDIT_ARTICLE_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: article.data,
      });
    });
    const expectedActionTypes = [EDIT_ARTICLE_FAIL];

    return store.dispatch(editAnArticle({})).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(
        action => action.type,
      );

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });

  it('dispatches PUBLISH_ARTICLE', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: article.data,
      });
    });
    const expectedActionTypes = [PUBLISH_ARTICLE];

    return store.dispatch(publishAnArticle({})).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(
        action => action.type,
      );

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });
  it('dispatches PUBLISH_ARTICLE_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: article.data,
      });
    });
    const expectedActionTypes = [PUBLISH_ARTICLE_FAIL];

    return store.dispatch(publishAnArticle({})).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(
        action => action.type,
      );

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });
  it('dispatches FETCH_ARTICLES_BY_AUTHOR', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: article.data,
      });
    });
    const expectedActionTypes = [FETCH_ARTICLES_BY_AUTHOR];

    return store.dispatch(fetchAllArticlesByAuthor({})).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(
        action => action.type,
      );

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });
  it('dispatches FETCH_ARTICLES_BY_AUTHOR_FAIL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: articles.data,
      });
    });
    const expectedActionTypes = [FETCH_ARTICLES_BY_AUTHOR_FAIL];

    return store.dispatch(fetchAllArticlesByAuthor({})).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(
        action => action.type,
      );

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });
});

describe('CreateArticleView map props to state', () => {
  const editedArticle = article;
  const publishedArticle = article;
  it('should return the initial state', () => {
    expect(mapStateToProps({
      article, editedArticle, publishedArticle,
    })).toEqual({
      article, editedArticle, publishedArticle,
    });
  });
});

describe('CreateArticleView map props to state', () => {
  const editedArticle = article;
  const publishedArticle = article;
  it('should return the initial state', () => {
    expect(mapStateToProps({
      article, editedArticle, publishedArticle,
    })).toEqual({
      article, editedArticle, publishedArticle,
    });
  });
});
