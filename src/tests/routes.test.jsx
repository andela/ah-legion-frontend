import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { HomeView } from '../containers/HomeView';
import Routes from '../routes';
import store from '../store/store';

test('valid homepage path', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MemoryRouter>,
  );
  expect(wrapper.find(HomeView)).toHaveLength(1);
});
