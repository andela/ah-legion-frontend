import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {Articles} from '../../components/articles/Articles';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ArticlesMapComponent from '../../components/articles/articlesMap';
import * as testData from './../testData';
import fetchPersonalArticles from '../../store/actions/articleActions';
import { mapDispatchToProps } from '../../components/user/FollowUnfollow';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

const props = {
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
    const wrapper = shallow(<Articles {...props} />);
    wrapper.setProps({personalArticles:{personalArticles: {Articles: testData.userarticles}}})
    const wrapperInstance = wrapper.instance();
    expect(wrapperInstance.state.articles).toEqual([{"activated": true, "average_rating": "This article has not been rated.", "body": "Some  other kjhugyftgsbdfcewd really Miusov, as a man man of breeding and deilcacy, could not but feel some inwrd qualms, when he reached the Father Superior's with Ivan: he felt ashamed of havin lost his temper. He felt that he ought to have disdaimed that despicable wretch, Fyodor Pavlovitch, too much to have been upset by him in Father Zossima's cell, and so to have forgotten himself. Teh monks were not to blame, in any case, he reflceted, on the steps. And if they're decent people here (and the Father Superior, I understand, is a nobleman) why not be friendly and courteous withthem? I won't argue, I'll fall in with everything, I'll win them by politness, and show them that I've nothing to do with that Aesop, thta buffoon, that Pierrot, and have merely been takken in over this affair, just as they haveHe determined to drop his litigation with the monastry, and relinguish his claims to the wood-cuting and fishery rihgts at once. He was the more ready to do this becuase the rights had becom much less valuable, and he had indeed the vaguest idea where the wood and river in quedtion were.", "created_at": "2019-04-24T11:22:02.354584+03:00", "description": null, "draft": "fjbhdghjbdujvnfeu cvhuwdv yv vbv fv uvd vdnv cdvu", "editing": false, "id": 15, "published": false, "reading_time": "1 minutes", "slug": "another-good-heading-3", "tags": [], "title": "Another good heading", "updated_at": "2019-04-24T11:22:02.354614+03:00"}]);
    });
});

describe('ArticlesMapComponent', () => {
  it('renders a single article component', () => {
    const component = shallow(<ArticlesMapComponent articles={testData.userarticles} />);
    expect(component).toHaveLength(1);
  });
})

describe('MapDispatchToProps', () => { 
  const payload = { isRegister: true, modalShow: true }
  const dispatch = jest.fn()
  it('register user function is called', () => {
    mapDispatchToProps(dispatch).followAuthor('payload');
    expect(dispatch).toHaveBeenCalled();
  });
  it('register user function is called', () => {
    mapDispatchToProps(dispatch).unfollowAuthor('payload');
    expect(dispatch).toHaveBeenCalled();
  });
});
