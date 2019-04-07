import expect from 'expect';
import promiseMiddleware from 'redux-promise-middleware';
import axiosconfig from '../../axiosConfig';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchPersonalArticles from '../../store/actions/articleActions';
import profile from '../mockData/profile';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('async actions', () => {
  const middlewares = [promiseMiddleware()];

  beforeEach(() => {
    moxios.install(axiosconfig);
  });
  afterEach(() => {
    moxios.uninstall(axiosconfig);
  });
  it('it dispatches PERSONAL_ARTICLES_FETCHED on fetchPersonalArticles', () => {
    const payload = { profile };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: payload.profile,
      });
    });
    const expectedActions = ['PERSONAL_ARTICLES_FETCHED'];
    // configure Mock store
    const store = mockStore({ proifleData: {}});

    // call the getBucketLists async action creator
    return store.dispatch(fetchPersonalArticles()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches AUTHENTICATION_FAILS on unauthorized fetchPersonalArticles', () => {
    const payload = { profile };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: payload,
      });
    });
    const expectedActions = ['AUTHENTICATION_FAILED'];
    // configure Mock store
    const store = mockStore({ proifleData: {}});

    // call the getBucketLists async action creator
    return store.dispatch(fetchPersonalArticles()).then(() => {
      const dispatchedActions = store.getActions();
      const actionArticlesTypes = dispatchedActions.map(action => action.type);

      expect(actionArticlesTypes).toEqual(expectedActions);
    });
  });
});
