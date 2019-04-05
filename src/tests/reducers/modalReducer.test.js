import modalReducer from '../../store/reducers/modal-reducer';
import * as types from '../../store/actions/actionTypes';

describe('modal reducer', () => {
  it('should return the initial state', () => {
    expect(modalReducer(undefined, {})).toEqual(
      {
        isRegister: false,
        modalShow: false,
      }
    )
  })

  it('should change state on action type show modal', () => {
    expect(
      modalReducer({}, {
        type: types.SHOW_MODAL,
        payload: {
          isRegister: true,
          modalShow: true,
        }
      })
    ).toEqual(
      {
        isRegister: true,
        modalShow: true,
      }
    )
  })

  it('should change state on action type register', () => {
    expect(
      modalReducer({}, {
        type: types.REGISTER
      })
    ).toEqual(
      {
        isRegister: true,
        modalShow: true,
      }
    )
  })

  it('should change state on action type login', () => {
    expect(
      modalReducer({}, {
        type: types.LOGIN
      })
    ).toEqual(
      {
        isRegister: false,
        modalShow: true,
      }
    )
  })
});
