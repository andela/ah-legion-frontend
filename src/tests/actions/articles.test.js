import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { fetchAllArticles, fetchArticles, fetchArticlesFail } from '../../store/actions/articles';
import { FETCH_ALL_ARTICLES, FETCH_ALL_ARTICLES_FAIL } from '../../store/actions/actionTypes';
import { articles, error } from '../testData';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore();

describe('fetchAllArticles ', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should create an action to fetch articles', () => {
    const expectedAction = {
      type: FETCH_ALL_ARTICLES,
      articles,
    };
    expect(fetchArticles(articles)).toEqual(expectedAction);
  });

  it('should create an action to show error when fetching articles', () => {
    const expectedAction = {
      type: FETCH_ALL_ARTICLES_FAIL,
      error,
    };
    expect(fetchArticlesFail(error)).toEqual(expectedAction);
  });
  it('should get all articles after a successfull HTTP call', () => {
    const mockHttpResponse = {
      status: 201,
      articles,
    };
    const expectedActions = [
      {
        articles,
      },
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      return request.resolve({
        status: 201,
        response: mockHttpResponse,
      });
    });
    store.dispatch(fetchAllArticles()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an error after a failed HTTP call', () => {
    const mockHttpResponse = {
      error,
    };
    const expectedActions = [
      {
        error,
      },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      return request.resolve({
        response: mockHttpResponse,
      });
    });
    store.dispatch(fetchAllArticles()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
