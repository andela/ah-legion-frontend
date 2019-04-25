import promiseMiddleware from 'redux-promise-middleware';
import { axiosConfigAuth } from '../../axiosConfig';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../store/actions/profileActions';
import profile, { errors } from '../mockData/profile';
import * as testData from '../mockData/profile';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('async actions', () => {
  const middlewares = [promiseMiddleware()];

  beforeEach(() => {
    moxios.install(axiosConfigAuth);
  });
  afterEach(() => {
    moxios.uninstall(axiosConfigAuth);
  });
  it('it dispatches PROFILE_FETCHED on fetchProfile', () => {
    const payload = { errors };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: payload,
      });
    });
    const expectedActions = ['PROFILE_FETCHED'];
    // configure Mock store
    const store = mockStore(34);

    // call the getBucketLists async action creator
    return store.dispatch(actions.fetchProfile()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches PROFILE_FETCH_FAILED on unauthorized fetchProfile', () => {
    const payload = { profile };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: payload.profile,
      });
    });
    const expectedActions = ['AUTHENTICATION_FAILED'];
    // configure Mock store
    const store = mockStore({ bucketlists: [] });

    // call the getBucketLists async action creator
    return store.dispatch(actions.fetchProfile()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches PROFILE_UPDATE_FAILED on invalid updateProfile', () => {
    const payload = { profile };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: payload.profile,
      });
    });
    const expectedActions = ['PROFILE_UPDATE_FAILED'];
    // configure Mock store
    const store = mockStore({ bucketlists: [] });

    // call the getBucketLists async action creator
    return store.dispatch(actions.updateProfile(profile)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches profileUpdated on updateProfile', () => {
    const payload = { profile };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: payload.profile,
      });
    });
    const expectedActions = ['PROFILE_UPDATE_SUCESSFUL'];
    // configure Mock store
    const store = mockStore({ bucketlists: [] });

    // call the getBucketLists async action creator
    return store.dispatch(actions.updateProfile(profile)).then(() => {
      const dispatchedActions = store.getActions();
      const actionUpdateTypes = dispatchedActions.map(action => action.type);

      expect(actionUpdateTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches profileUpdated on FOLLOW_AUTHOR_SUCCESSFUL', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: testData.followStats,
      });
    });
    const expectedActions = ['FOLLOW_AUTHOR_SUCCESSFUL'];
    // configure Mock store
    const store = mockStore({});

    // call the getBucketLists async action creator
    return store.dispatch(actions.followAuthor('brian')).then(() => {
      const dispatchedActions = store.getActions();
      const actionUpdateTypes = dispatchedActions.map(action => action.type);

      expect(actionUpdateTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches profileUpdated on UNFOLLOW_AUTHOR_SUCCESSFUL', () => {
    const payload = { profile };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: testData.unfollowStats,
      });
    });
    const expectedActions = ['UNFOLLOW_AUTHOR_SUCCESSFUL'];
    // configure Mock store
    const store = mockStore({});

    // call the getBucketLists async action creator
    return store.dispatch(actions.unfollowAuthor('brian')).then(() => {
      const dispatchedActions = store.getActions();
      const actionUpdateTypes = dispatchedActions.map(action => action.type);

      expect(actionUpdateTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches profileUpdated on FOLLOW_AUTHOR_FAILED', () => {
    const payload = { profile };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: testData.followAuthorFailed,
      });
    });
    const expectedActions = ['FOLLOW_AUTHOR_FAILED'];
    // configure Mock store
    const store = mockStore({});

    // call the getBucketLists async action creator
    return store.dispatch(actions.followAuthor()).then(() => {
      const dispatchedActions = store.getActions();
      const actionUpdateTypes = dispatchedActions.map(action => action.type);

      expect(actionUpdateTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches profileUpdated on UNFOLLOW_AUTHOR_FAILED', () => {
    const payload = { profile };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: testData.unfollowAuthorFailed,
      });
    });
    const expectedActions = ['UNFOLLOW_AUTHOR_FAILED'];
    // configure Mock store
    const store = mockStore({});

    // call the getBucketLists async action creator
    return store.dispatch(actions.unfollowAuthor('profile')).then(() => {
      const dispatchedActions = store.getActions();
      const actionUpdateTypes = dispatchedActions.map(action => action.type);

      expect(actionUpdateTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches profileUpdated on AUTHOR_PROFILE_FETCHED_SUCCESSFUL', () => {
    const payload = { profile };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: testData.authorProfile,
      });
    });
    const expectedActions = ['AUTHOR_PROFILE_FETCHED_SUCCESSFUL'];
    // configure Mock store
    const store = mockStore({});

    // call the getBucketLists async action creator
    return store.dispatch(actions.fetchAuthorProfile('profile')).then(() => {
      const dispatchedActions = store.getActions();
      const actionUpdateTypes = dispatchedActions.map(action => action.type);

      expect(actionUpdateTypes).toEqual(expectedActions);
    });
  });
  it('it dispatches profileUpdated on AUTHOR_PROFILE_FETCH_FAILED', () => {
    const payload = { profile };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: testData.failedAuthorProfile,
      });
    });
    const expectedActions = ['AUTHOR_PROFILE_FETCHED_SUCCESSFUL'];
    // configure Mock store
    const store = mockStore({});

    // call the getBucketLists async action creator
    return store.dispatch(actions.fetchAuthorProfile('brian')).then(() => {
      const dispatchedActions = store.getActions();
      const actionUpdateTypes = dispatchedActions.map(action => action.type);

      expect(actionUpdateTypes).toEqual(expectedActions);
    });
  });
});
