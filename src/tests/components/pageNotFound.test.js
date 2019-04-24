
import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from '../../components/404';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


const props = {
  history: {
    push: jest.fn(),
  },
  isRegister: true,
};
jest.mock('react-router-dom/BrowserRouter', () => ({ children }) => <div>{children}</div>);

test('invalid path should redirect to 404', () => {
  const wrapper = shallow(<PageNotFound {...props} />);
  expect(wrapper.find(PageNotFound)).toHaveLength(0);
});
