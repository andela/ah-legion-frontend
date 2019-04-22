import React from 'react';
import { shallow, mount } from 'enzyme';
import { EditorState } from 'draft-js';
import { containerArticles, articles } from '../testData';
import { HomeView, mapStateToProps, mapDispatchToProps } from '../../containers/HomeView';
import { CreateArticleView } from '../../containers/CreateArticleView';
import { DraftsView } from '../../containers/DraftsView';
import Home from '../../components/Home';
import Drafts from '../../components/Drafts';

describe("HomeView", () => {
  it("renders all divs, h3 and h2 correctly", () => {
    const props = {
      fetchArticles: jest.fn()
    };
    const component = shallow(
      <HomeView articles={containerArticles} {...props} />
    );
    expect(component.contains(<Home />)).toBeTruthy();
  });
});


describe('HomeView  MapDispatchToProps', () => {
  const dispatch = jest.fn();
  it('fetch articles function is called', () => {
    mapDispatchToProps(dispatch).fetchArticles();
    expect(dispatch).toHaveBeenCalled();
  });
});
describe('DraftsView', () => {
  it('renders all divs correctly', () => {
    const component = shallow(<DraftsView authorArticles={articles} />);
    expect(component.contains(<Drafts />)).toBeTruthy();
  });
});

describe("HomeView map props to state", () => {
  it("should return the initial state", () => {
    const state = {
      articles: {articles: {next: ''}},
    };

    const expectedState = {
      articles: {articles: {next: ''}},
      next: '',
    }
    expect(mapStateToProps({...state})).toEqual(expectedState);
  });
});

describe('CreateArticleView', () => {
  function setup() {
    const props = {
      create: jest.fn(),
      edit: jest.fn(),
      article: {},
      match: {
        path: '/article/create',
        params: {},
      },
    };
    const component = mount(<CreateArticleView {...props} />);
    return {
      props,
      component,
    };
  }

  it('should render self and subcomponents', () => {
    const { component } = setup();

    component.setProps({
      createArticle: jest.fn(),
      article: {
        article: {
          slug: 'new-article',
        },
      },
      history: {
        push: jest.fn(),
      },
      match: {
        path: '/create/article',
        params: {},
      },
    });

    const tag = {
      id: 'sample',
      text: 'sample',
    };
    component.setState({
      tags: [{ id: 'sample', text: 'sample' }],
    });
    expect(component.find('.draft').length).toBe(2);
    const spy1 = jest.spyOn(component.instance(), 'onEditorStateChange');
    const spy2 = jest.spyOn(component.instance(), 'handleChange');
    const spy3 = jest.spyOn(component.instance(), 'handleDelete');
    const spy4 = jest.spyOn(component.instance(), 'handleAddition');
    const spy5 = jest.spyOn(component.instance(), 'onPublish');
    component.instance().handleAddition(tag);
    component.instance().handleDelete(0);
    const editorState = EditorState.createEmpty();
    component.instance().onEditorStateChange(editorState);
    const event = { target: { name: 'special', value: 'party' } };
    component.instance().handleChange(event);
    const publish = component.find('.btn-publish').at(1);
    publish.simulate('click');
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toBeCalledWith(0);
    expect(spy4).toBeCalledWith({ id: 'sample', text: 'sample' });
    expect(spy5).toHaveBeenCalled();
  });
});
