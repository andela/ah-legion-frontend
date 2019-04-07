import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Articles from '../../components/articles/Articles';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

const props = {
  personaArticles: [],
};


describe('Articles component', () => {
  it('renders a single article component', () => {
    const component = mount(<Provider store={store}><Articles /></Provider>);
    expect(component).toHaveLength(1);
  });
  it('Should update state on receiving authenticated false', () => {
    const wrapper = shallow(<Articles {...props} />);
    wrapper.setProps({personalArticles:[]})
    const wrapperInstance = wrapper.instance();
    expect(wrapperInstance.state.articles).toEqual(undefined);
    });
});
