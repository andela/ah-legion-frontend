import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { showErrors, registerUser } from "../../store/actions/registerActions";
import axiosConfig from '../../axiosConfig';
import * as types from '../../store/actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

const mockResponseSuccess = {
  status: 200,
  data: {
    user: {
        "message": "Successfully created your account. Please proceed to your email dan@gmail.com to verify your account."
    }
}
};

const mockResponseFailure = {
  status: 400,
  response: {
    data:{
      "errors": {
          "email": [
              "A user with this email already exists"
          ],
          "username": [
              "A user with this username already exists"
          ]
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

  it("it dispatches SHOW_ALERT and USER_ when the user succesfully registers in", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockResponseSuccess.data
      });
    });
    const expectedActionTypes = [types.SHOW_MODAL, types.SHOW_ALERT, types.IS_LOADING, types.SHOW_ERRORS ];

    return store.dispatch(registerUser()).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(action => action.type);

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });
  it("dispatches IS_LOADING and SHOW_ERRORS when the register request fails", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: mockResponseFailure.response.data
      });
    });
    const expectedActionTypes = [types.IS_LOADING, types.SHOW_ERRORS];

    return store.dispatch(registerUser()).then(() => {
      const dispatchedActions = store.getActions();
      const dispatchedActionTypes = dispatchedActions.map(action => action.type);

      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
  });
});
