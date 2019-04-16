import * as types from '../../store/actions/actionTypes';
import registerReducer from '../../store/reducers/registerReducer';

describe('register reducer', () => {
  it('should return the initial state', () => {
    expect(registerReducer(undefined, {})).toEqual(
      {
        errors: {},
        isLoading: false,
      }
    )
  })

  it('should change state on action type SHOW_ERRORS', () => {
    expect(
      registerReducer({}, {
        type: types.SHOW_ERRORS,
        payload: {
          username: 'Bleh bleh bleh'
        }
      })
    ).toEqual(
      {
        errors: {username: 'Bleh bleh bleh'}
      }
    )
  })
});
