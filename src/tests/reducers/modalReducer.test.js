import modalReducer from '../../store/reducers/modalReducer';
import * as types from '../../store/actions/actionTypes';

describe('modal reducer', () => {
  it('should return the initial state', () => {
    expect(modalReducer(undefined, {})).toEqual(
      {
        component: '',
        modalShow: false
      }
    )
  })

  it('should change state on action type show modal', () => {
    expect(
      modalReducer({}, {
        type: types.SHOW_MODAL,
        payload: {
          component: 'register',
          modalShow: true,
        }
      })
    ).toEqual(
      {
        component: 'register',
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
        component: 'register',
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
        component: 'login',
        modalShow: true,
      }
    )
  })

it('should change state on action type initiatate reset', () => {
  expect(
    modalReducer({}, {
      type: types.INITIATE_RESET
    })
  ).toEqual(
    {
      component: 'initiate-reset',
      modalShow: true,
    }
  )
})
  
it('should change state on action type password reset', () => {
  expect(
    modalReducer({}, {
      type: types.PASSWORD_RESET
    })
  ).toEqual(
    {
      component: 'password-reset',
      modalShow: true,
    }
  )
})
});
