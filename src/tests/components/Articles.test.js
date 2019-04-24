import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Articles, mapDispatchToProps, fetchPersonalArticles } from '../../components/articles/Articles';
import ArticlesMapComponent from '../../components/articles/articlesMap';
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
    const wrapper = mount(<Articles {...props} />);
    wrapper.setProps({personalArticles:{personalArticles: {Articles: []}}});
    wrapper.setState({articles: [],
    })
    const wrapperInstance = wrapper.instance();
    expect(wrapperInstance.state.articles).toEqual([]);
    });
});

describe('MapDispatchToProps', () => { 
  const dispatch = jest.fn()
  it('should dispatch fetchPersonalArticles', () => {
    mapDispatchToProps(dispatch).fetchPersonalUserArticles();
    expect(dispatch).toHaveBeenCalled();
  });
});


describe('ArticlesMap component', () => {
    it('Should use props to populate elements', () => {
      const articles = [
        {
          title: 'bobs burgers',
          body: 'this is the body',
          id: 1,
        },
        {
          title: 'other burgers',
          body: 'this is also the body',
          id: 2,
        },
      ]
      const wrapper = shallow(<ArticlesMapComponent articles={ articles } />);
      expect(wrapper.find('.article-card').length).toBe(2);
    });
});
