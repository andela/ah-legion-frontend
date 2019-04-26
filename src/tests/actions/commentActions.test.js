import expect from 'expect';
import promiseMiddleware from 'redux-promise-middleware';
import axiosconfig, { axiosConfigAuth } from '../../axiosConfig';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../store/actions/commentsActions';
import * as testData from '../testData';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('test comment actions without authorization', () => {
  const middlewares = [promiseMiddleware()];

  beforeEach(() => {
    moxios.install(axiosconfig);
  });
  afterEach(() => {
    moxios.uninstall(axiosconfig);
  });
  it('it dispatches FETCH_AN_ARTICLE on fetchAnArticle', () => {
    const payload = testData.oneArticle;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: payload,
      });
    });
    const expectedActions = ['FETCH_AN_ARTICLE'];
    // configure Mock store
    const store = mockStore();

    // call the anArticle async action creator
    console.log(store)
    return store.dispatch(actions.fetchAnArticle(payload.slug)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches an error fetchAnArticle', () => {
      const payload = 'nothing';
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
          response: payload,
        });
      });
      const expectedActions = ["FETCH_AN_ARTICLE_404"];
      // configure Mock store
      const store = mockStore({});
  
      // call the fetchAnArticle async action creator
      return store.dispatch(actions.fetchAnArticle()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedActions);
      },);
    });
  it('it dispatches FETCH_ARTICLE_COMMENTS on fetchArticleComments', () => {
    const payload = testData.sampleComments;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: payload,
      });
    });
    const expectedActions = ['FETCH_ARTICLE_COMMENTS'];
    // configure Mock store
    const store = mockStore({});

    // call the fetchArticleComments async action creator
    return store.dispatch(actions.fetchArticleComments(payload.slug)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    },);
  });
  it('it dispatches an error fetchArticleComments', () => {
    const payload = 'nothing';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: payload,
      });
    });
    const expectedActions = [];
    // configure Mock store
    const store = mockStore({});

    // call the fetchAnArticle async action creator
    return store.dispatch(actions.fetchArticleComments()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    },);
  });
});


describe('test comment actions with authorization', () => {
  const middlewares = [promiseMiddleware()];

  beforeEach(() => {
    moxios.install(axiosConfigAuth);
  });
  afterEach(() => {
    moxios.uninstall(axiosConfigAuth);
  });
  it('it dispatches CREATE_COMMENT_SUCCESS on createAComment', () => {
    const payload = testData.oneComment;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: payload,
      });
    });
    const expectedActions = ['CREATE_COMMENT_SUCCESS'];
    // configure Mock store
    const store = mockStore({});

    // call the createAComment async action creator
    return store.dispatch(actions.createAComment()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    },);
  });
  it('it dispatches CREATE_REPLY_SUCCESS on createAReply', () => {
    const payload = testData.oneComment;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: payload,
      });
    });
    const expectedActions = ["CREATE_REPLY_SUCCESS"];
    // configure Mock store
    const store = mockStore({});

    // call the createAReply async action creator
    return store.dispatch(actions.createAReply()).then(() => {
      const dispatchedActions = store.getActions();
      const actionUpdateTypes = dispatchedActions.map(action => action.type);

      expect(actionUpdateTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches CREATE_COMMENT_SUCCESS on createAComment error', () => {
    const payload = testData.oneComment;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: payload,
      });
    });
    const expectedActions = [];
    // configure Mock store
    const store = mockStore({});

    // call the createAComment async action creator
    return store.dispatch(actions.createAComment()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    },);
  });
  it('it dispatches an error on delete a comment', () => {
    const payload = 'ufala';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: payload,
      });
    });
    const expectedActions = [];
    // configure Mock store
    const store = mockStore({});

    // call the fetchAnArticle async action creator
    return store.dispatch(actions.deleteAComment()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    },);
  });
  it('it dispatches an error on edit a comment', () => {
    const payload = 'ufala';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: payload,
      });
    });
    const expectedActions = [];
    // configure Mock store
    const store = mockStore({});

    // call the editAComment async action creator
    return store.dispatch(actions.editAComment()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedActions);
    },);
  });
  it('it dispatches DELETED_COMMENT on deleteAComment', () => {
    const payload = testData.sampleComments;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: payload,
      });
    });
    const expectedActions = ['DELETED_COMMENT'];
    // configure Mock store
    const store = mockStore({});

    // call the deleteAComment async action creator
    return store.dispatch(actions.deleteAComment(payload.slug, 34)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    },);
  });
  it('it dispatches EDITED_COMMENT on editAComment', () => {
    const payload = testData.sampleComments;
    const editData ={
      body: 'asdasdasd',
    }
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: payload,
      });
    });
    const expectedActions = ['EDITED_COMMENT'];
    // configure Mock store
    const store = mockStore({});

    // call the deleteAComment async action creator
    return store.dispatch(actions.editAComment(payload.slug, 34, editData)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    },);
  });
  it('it dispatches CREATE_COMMENT_SUCCESS on fetchAnArticle error', () => {
    const payload = testData.oneComment;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: payload,
      });
    });
    const expectedActions = [];
    // configure Mock store
    const store = mockStore({});

    // call the anArticle async action creator
    return store.dispatch(actions.createAReply()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    },);
  });
});