import expect from 'expect';
import promiseMiddleware from 'redux-promise-middleware';
import axiosconfig, { axiosConfigAuth } from '../../axiosConfig';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../store/actions/likeArticleActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('test like actions without authorization', () => {
  const middlewares = [promiseMiddleware()];
  
  beforeEach(() => {
    moxios.install(axiosconfig);
  });
  afterEach(() => {
    moxios.uninstall(axiosconfig);
  });
  it('it dispatches FETCH_TOTAL_LIKES on fetchAllLikes', () => {
    const payload = {
       "total_likes": 3,
       "total_dislikes": 0
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: payload,
      });
    });
    const expectedActions = ['FETCH_TOTAL_LIKES'];
    // configure Mock store
    const store = mockStore();

    // call the anArticle async action creator
    return store.dispatch(actions.fetchAllLikes("how-to-train-your-dragon")).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches FETCH_TOTAL_LIKES on fetchAllLikes', () => {
    const payload = {
       "total_likes": 3,
       "total_dislikes": 0
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: payload,
      });
    });
    const expectedActions = [];
    // configure Mock store
    const store = mockStore();

    return store.dispatch(actions.fetchAllLikes()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    });
  }); 
});

describe('test like actions with authorization', () => {
    const middlewares = [promiseMiddleware()];
    
    beforeEach(() => {
      moxios.install(axiosConfigAuth);
    });
    afterEach(() => {
      moxios.uninstall(axiosConfigAuth);
    });
    it('it dispatches HAS_REACTION on fetchUserLikeStatus', () => {
        const payload = {
            "id": 49,
            "article_id": 6,
            "user_id": 5,
            "is_like": false
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: payload,
          });
        });
        const expectedActions = ['HAS_REACTION'];
        // configure Mock store
        const store = mockStore();
    
        return store.dispatch(actions.fetchUserLikeStatus("how-to-train-your-dragon")).then(() => {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
    
          expect(actionTypes).toEqual(expectedActions);
        });
      });
      it('it dispatches REMOVE_REACTION on fetchUserLikeStatus error', () => {
        const payload = {
            "error": "Could not be found." 
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 404,
            response: payload,
          });
        });
        const expectedActions = ['REMOVE_REACTION'];
        // configure Mock store
        const store = mockStore();
    
        return store.dispatch(actions.fetchUserLikeStatus()).then(() => {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
    
          expect(actionTypes).toEqual(expectedActions);
        });
      });
      it('it dispatches HAS_REACTION on createLike', () => {
        const payload = {
            "is_like": false
        };
        const output = {
            "id": 49,
            "article_id": 6,
            "user_id": 5,
            "is_like": false
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 201,
            response: output,
          });
        });
        const expectedActions = ['HAS_REACTION'];
        // configure Mock store
        const store = mockStore();
    
        return store.dispatch(actions.createLike("how-to-train",payload)).then(() => {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
    
          expect(actionTypes).toEqual(expectedActions);
        });
      }); 
      it('it dispatches REMOVE_REACTION on createLike error', () => {
        const output = {
            "id": "bad request",
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
            response: output,
          });
        });
        const expectedActions = ['REMOVE_REACTION'];
        // configure Mock store
        const store = mockStore();
    
        return store.dispatch(actions.createLike()).then(() => {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
    
          expect(actionTypes).toEqual(expectedActions);
        });
      });
      it('it dispatches HAS_REACTION on updateLike', () => {
        const payload = {
            "is_like": false
        };
        const output = {
            "id": 49,
            "article_id": 6,
            "user_id": 5,
            "is_like": false
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: output,
          });
        });
        const expectedActions = ['HAS_REACTION'];
        // configure Mock store
        const store = mockStore();
    
        return store.dispatch(actions.updateLike("how-to-train", 1 ,payload)).then(() => {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
    
          expect(actionTypes).toEqual(expectedActions);
        });
      });
      it('it dispatches REMOVE_REACTION on updateLike error', () => {
        const output = {
            "id": "bad request",
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
            response: output,
          });
        });
        const expectedActions = ['REMOVE_REACTION'];
        // configure Mock store
        const store = mockStore();
    
        return store.dispatch(actions.updateLike()).then(() => {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
    
          expect(actionTypes).toEqual(expectedActions);
        });
      });
      it('it dispatches REMOVE_REACTION on deleteLike', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200
          });
        });
        const expectedActions = ['REMOVE_REACTION'];
        // configure Mock store
        const store = mockStore();
    
        return store.dispatch(actions.deleteLike("how-to", 1)).then(() => {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
    
          expect(actionTypes).toEqual(expectedActions);
        });
      });
      it('it dispatches REMOVE_REACTION on deleteLike error', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400
          });
        });
        const expectedActions = ['REMOVE_REACTION'];
        // configure Mock store
        const store = mockStore();
    
        return store.dispatch(actions.deleteLike()).then(() => {
          const dispatchedActions = store.getActions();
          const actionTypes = dispatchedActions.map(action => action.type);
    
          expect(actionTypes).toEqual(expectedActions);
        });
      });
    });
