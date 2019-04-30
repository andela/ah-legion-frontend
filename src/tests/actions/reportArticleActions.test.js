import expect from 'expect';
import promiseMiddleware from 'redux-promise-middleware';
import { axiosConfigAuth } from '../../axiosConfig';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reportAnArticle from '../../store/actions/reportArticleActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('test report article actions', () => {
  const middlewares = [promiseMiddleware()];

  beforeEach(() => {
    moxios.install(axiosConfigAuth);
  });
  afterEach(() => {
    moxios.uninstall(axiosConfigAuth);
  });
  it('confirm that reportArticleActions works', () => {
    const payload = {
      message: 'Super racist article',
    };
    const slug = 'bb'
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: payload,
      });
    });
    const expectedActions = ['REPORT_SUCCESS', 'REPORTED_ARTICLE'];
    // configure Mock store
    const store = mockStore({});

    return store.dispatch(reportAnArticle(slug)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    },);
  });
  it('confirm that reportArticleActions failiure will work', () => {
    const slug = 'bb'
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
      });
    });
    const expectedActions = ["REPORT_FAILED"];
    // configure Mock store
    const store = mockStore({});

    return store.dispatch(reportAnArticle(slug)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    },);
  });
});
