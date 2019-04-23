import alertModalReducer from '../../store/reducers/alertModalReducer';
import * as types from '../../store/actions/actionTypes';

describe(' alert modal reducer', () => {
  it('should return the initial state', () => {
    expect(alertModalReducer(undefined, {})).toEqual(
      {
        showAlert: false,
        message: '',
        colorClass: '',
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
});
