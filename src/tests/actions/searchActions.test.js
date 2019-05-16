import expect from 'expect';
import promiseMiddleware from 'redux-promise-middleware';
import axiosconfig from '../../axiosConfig';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../store/actions/searchActions';
import * as testData from '../testData';

const { REACT_APP_BASE_URL } = process.env;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('test search actions which do not require authorization', () => {
    const middlewares = [promiseMiddleware()];
    beforeEach(() => {
        moxios.install();
        
      });
      afterEach(() => {
        moxios.uninstall();
      });
      it('it dispatches SEARCH_UPDATE_TITLE on fetchSearchUpdate success', () => {
          const thisURL = REACT_APP_BASE_URL.concat("articles/title/search/?query=a");
          const payload = {
            searchURL: thisURL,
            action: "SEARCH_UPDATE_TITLE",
          }
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
          });
        });
        const expectedActions = ['SEARCH_UPDATE_TITLE'];
        // configure Mock store
        const store = mockStore({});
    
        return store.dispatch(actions.fetchSearchUpdate(payload)).then(() => {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
    
          expect(actionTypes).toEqual(expectedActions);
        },);
      });
      it('it dispatches SEARCH_UPDATE_TITLE on fetchSearchUpdate fail', () => {
        const thisURL = REACT_APP_BASE_URL.concat("articles/title/search/?query=a");
        const payload = {
          action: "SEARCH_UPDATE_TITLE",
        }
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
        });
      });
      const expectedActions = [];
      // configure Mock store
      const store = mockStore({});
  
      return store.dispatch(actions.fetchSearchUpdate(payload)).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
  
        expect(actionTypes).toEqual(expectedActions);
      },);
    });
    it('it dispatches GET_SEARCH_RESULTS on fetchSearchResults fail', () => {
      moxios.wait(() => {
        const request = moxios.requests.first();
        request.respondWith({
          status: 400,
        });
      });
      const expectedActions = [];
      // configure Mock store
      const store = mockStore({});
  
      return store.dispatch(actions.fetchSearchResults()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
  
        expect(actionTypes).toEqual(expectedActions);
      },);
    });
});
