import expect from 'expect';
import promiseMiddleware from 'redux-promise-middleware';
import axiosconfig from '../../axiosConfig';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../store/actions/profileActions';
import profile, { errors } from '../mockData/profile';


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
    },);
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
    },);
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
});
