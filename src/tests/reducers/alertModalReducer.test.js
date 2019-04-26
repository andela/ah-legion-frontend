import alertModalReducer from '../../store/reducers/alertModalReducer';
import * as types from '../../store/actions/actionTypes';

describe(' alert modal reducer', () => {
  it('should return the initial state', () => {
    expect(alertModalReducer(undefined, {})).toEqual(
      {
        "colorClass": "", 
        "isDeleteComment": false,
        "message": "",
        "showAlert": false
      }
    )
  })

  it('should change state on action type show alert', () => {
    expect(
      alertModalReducer({}, {
        type: types.SHOW_ALERT,
        payload: {
          showAlert: true,
          message: 'message',
          colorClass: 'alert-success',
        }
      })
    ).toEqual(
      {
        showAlert: true,
        message: 'message',
        colorClass: 'alert-success',
      }
    )
  })
  it('should change state on action type delete comment', () => {
    expect(
      alertModalReducer({}, {
        type: types.DELETE_COMMENT,
        payload: {
          colorClass: 'alert-danger',
        }
      })
    ).toEqual(
      {
        colorClass: 'alert-danger',
        deleteData: {
          colorClass: 'alert-danger',
        },
        isDeleteComment: true,
        showAlert: true
      }
    )
  })
});
