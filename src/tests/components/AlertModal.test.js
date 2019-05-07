import { ConnectedAlertModal, mapDispatchToProps } from '../../components/AlertModal';
import { mapStateToProps } from '../../components/AlertModal';
import { shallow, mount } from 'enzyme';
import React from 'react';
import {
  deleteAComment,
} from '../../store/actions/commentsActions';

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
  it('delete comment', () => {
    const props= {
      isDeleteComment: true,
    }
    const dispatch = jest.fn();
    const component = mount(<ConnectedAlertModal {...props} showAlert={true} message={'pass test, paass!'} dispatch={dispatch}/>);
		const closeBtn = component.find('.close');
    closeBtn.simulate('click');
    expect(dispatch).toHaveBeenCalled();
  });
  it('Should dispatch the deleteComment', () => {
    const props= {
      isDeleteComment: true,
      dispatch: jest.fn(),
      deleteData: {
        slug:"wertrtew",
        id: 44,
      } , 
      deleteComment: jest.fn()
    }
    const component = mount(<ConnectedAlertModal {...props} showAlert={true} message={'pass test, paass!'}/>);
    const wrapperInstance = component.instance();
    const event = {
      preventDefault: jest.fn(),
      target: {
        deleteComment: jest.fn(),
      },
    };
    const state = {
      thisComment: '',
    };
    wrapperInstance.setState(state);
    wrapperInstance.deleteComment(event);
    expect(wrapperInstance.state.thisComment).toEqual('')
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

describe('MapDispatchToProps', () => { 
  const dispatch = jest.fn()
  it('should dispatch deleteComment', () => {
    mapDispatchToProps(dispatch).deleteComment("werw",{});
    expect(dispatch).toHaveBeenCalled();
  });
});
