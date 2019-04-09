import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import firebase from "firebase";
import firebasemock from 'firebase-mock';
import axiosConfig from '../../axiosConfig';
import { socialLoginAction, createLoginSuccess, createLoginFailure, googleLoginAction, twitterLoginAction, facebookLoginAction } from '../../store/actions/authActions/socialLoginAction';
import { LOGIN_SUCCESS, SOCIAL_LOGIN_FAIL, AUTHENTICATION_FAILED, SHOW_MODAL } from '../../store/actions/actionTypes';

const mockauth = new firebasemock.MockAuthentication();
const middleware = [thunk];
const mockStore = configureMockStore(middleware);


let localStorage = {};

const mockLocalStorage =  {
    setItem(key, value) {
      return Object.assign(localStorage, { [key]: value });
    }
  };

window.localStorage = mockLocalStorage;

const mockSuccessResponse = {
    status: 200,
    data: {
        user: { 
            token: "thisisatokenforyou",
        }

    }
};

const mockFailureResponse = {
  status: 400,
  data: {
      errors: { 
          error: "some funny error",
      }

  }
};

describe("Oauth network calls", () => {
    beforeEach(() => {
        moxios.install(axiosConfig);
    });

    afterEach(() => {
        moxios.uninstall(axiosConfig);
    });

    it('dispatches LOGIN_SUCCESS action when user logs in', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: {
                    user: { 
                        token: "thisisatokenforyou",
                    }
                }
              });
        });

        const expectedActions = [
          { type: LOGIN_SUCCESS },
          { type: SHOW_MODAL, payload: { modalShow: false }}
        ]

        const store = mockStore({profiles: {}});

        store.dispatch(socialLoginAction('thisisatokenforyou', 'google', '')).then(() => {
            const dispatchedActions = store.getActions();
            const dispatchedActionTypes = dispatchedActions.map(action => action.type);
            expect(dispatchedActionTypes).toEqual(expectedActions);
        });
    });

    it("dispatches SOCIAL_LOGIN_FAIL when login fails", () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {
            errors: { 
                error: "some funny error",
            }
      
        }
        });
      });
      const expectedActions = [
        SOCIAL_LOGIN_FAIL
      ];

      const store = mockStore({});

      store.dispatch(socialLoginAction('token', 'provider', '')).then(() => {
        const dispatchedActions = store.getActions();
        const dispatchedActionTypes = dispatchedActions.map(action => action.type);
        expect(dispatchedActionTypes).toEqual(expectedActions);
      });
    });
})

describe('social login actions', () => {
    beforeEach(() => {
    });

    it('Dispatches the success action', () => {
      const expectedActions = [
        {
          'type': LOGIN_SUCCESS,
        },
      ];
      const store = mockStore({});
      store.dispatch(createLoginSuccess());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('Dispatches the failure action and payload', () => {
        const expectedActions = [
          {
            'type': SOCIAL_LOGIN_FAIL,
            'provider': 'google',
          },
        ];
        const store = mockStore({});
        store.dispatch(createLoginFailure('google'));
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  
  describe('google login action', () => {
    beforeEach(() => {
      const { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN } = process.env;

      firebase.initializeApp({
        apiKey: REACT_APP_FIREBASE_API_KEY,
        authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
      });
    });
    
    it('makes after successful call it dispatches socialloginaction', () => {
      const expectedActions = [
      ];
      const store = mockStore({});
      store.dispatch(googleLoginAction());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('google login action', () => {
    beforeEach(() => {
    });
    
    it('makes after successful call it dispatches socialloginaction', () => {
      const expectedActions = [
      ];
      const store = mockStore({});
      store.dispatch(twitterLoginAction());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('google login action', () => {
    beforeEach(() => {
    });
    
    it('makes after successful call it dispatches socialloginaction', () => {
      const expectedActions = [
      ];
      const store = mockStore({});
      store.dispatch(facebookLoginAction());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });