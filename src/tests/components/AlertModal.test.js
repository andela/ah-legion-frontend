import { ConnectedAlertModal } from '../../components/AlertModal';
import { mapStateToProps } from '../../components/AlertModal';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('AlertModal', () => {
  it('renders one alert modal', () => {
    const component = shallow(<ConnectedAlertModal showAlert={true} message={'pass test, paass!'}/>);
    expect(component).toHaveLength(1);
  });

  it('close', () => {
    const dispatch = jest.fn();
    const component = mount(<ConnectedAlertModal showAlert={true} message={'pass test, paass!'} dispatch={dispatch}/>);
		const closeBtn = component.find('.close');
    closeBtn.simulate('click');
    expect(dispatch).toHaveBeenCalled();
	});

});

describe('ALert modal map props to state', () => {
  it('should return the initial state', () => {
    expect(mapStateToProps({ alertModalState: { showAlert: true, message: 'Bang!' } })).toEqual(
      {
        showAlert: true,
        message: 'Bang!',
      }
    )
  })
});
