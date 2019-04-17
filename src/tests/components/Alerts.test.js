import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Alerts from '../../components/Alerts';

const onAlertClick = jest.fn()
describe('Alerts component', () => {
  it('renders a single alerts component', () => {
    const component = shallow(<Alerts variant="test"
    showAlert={true}
    onAlertClick={onAlertClick}
    alertBody="alert body goes here" 
    alertHeading="alert heading goes here"
    />);
    expect(component).toHaveLength(1);
  });
});
