import * as types from '../../store/actions/actionTypes';
import ShowModal from '../../store/actions/changeFormAction';

describe('actions', () => {
  it('should create an action to show modal', () => {
    const payload = {
      isRegister: false,
      modalShow: false,
    }
    const expectedAction = {
      type: types.SHOW_MODAL,
      payload,
    }
    expect(ShowModal(payload)).toEqual(expectedAction)
  })
})
