import axiosConfig from "../../../../axiosConfig";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import loginAction from "../../../../store/actions/authActions/LoginAction";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

const mockResponseSuccess = {
  status: 200,
  data: {
    user: {
      token: "asdafsdfweqrwfadfwdfoweirhqwoerhpqwoef",
      username: "mimi",
      profile: { image_url: "http://www.example.com" }
    }
  }
};
const mockResponseFailure = {
  status: 400,
  response: {
    data: {
      errors: {
        error: "A user with this email address and password was not found"
      }
    }
  }
};
describe("async actions", () => {
  beforeEach(() => {
    moxios.install(axiosConfig);
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall(axiosConfig);
  });
  it("it dispatches SHOW_MODAL and LOGIN_SUCCESS when the user succesfully signs in", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockResponseSuccess.data
      });
    });
    const expectedActions = ["SHOW_MODAL", "LOGIN_SUCCESS", "IS_LOADING"];

    return store.dispatch(loginAction()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    });
  });
  it("dispatches LOGIN_FAIL when the login request fails", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockResponseFailure.response.data
      });
    });
    const expectedActions = ["LOGIN_FAIL", "IS_LOADING"];

    return store.dispatch(loginAction()).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);

      expect(actionTypes).toEqual(expectedActions);
    });
  });
});
