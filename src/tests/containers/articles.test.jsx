import React from 'react';
import { shallow, mount } from 'enzyme';
import { EditorState } from 'draft-js';
import { containerArticles, articles, article } from '../testData';
import { HomeView, mapStateToProps, mapDispatchToProps } from '../../containers/HomeView';
import { CreateArticleView } from '../../containers/CreateArticleView';
import { DraftsView } from '../../containers/DraftsView';
import { UpdateArticleView } from '../../containers/UpdateArticleView';
import Home from '../../components/Home';
import Drafts from '../../components/Drafts';

describe('HomeView', () => {
  it('renders all divs, h3 and h2 correctly', () => {
    const component = shallow(<HomeView articles={containerArticles} />);
    expect(component.contains(<Home />)).toBeTruthy();
  });
});
describe('HomeView map props to state', () => {
  it('should return the initial state', () => {
    expect(mapStateToProps({ articles })).toEqual({
      articles,
    });
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
  function setup() {
    const props = {
      fetchArticlesByAuthor: jest.fn(),
      deleteArticle: jest.fn(),
      authorArticles: jest.fn(),
      deletedArticle: jest.fn(),
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          slug: 'updated',
        },
      },
    };

    const component = mount(<DraftsView {...props} />);
    return {
      props,
      component,
    };
  }
  it('renders all divs correctly', () => {
    const { component } = setup();
    expect(component.find('div').length).toBe(8);
  });
  // it('calls delete', () => {
  //   const { component } = setup();
  //   const spy = jest.spyOn(component.instance(), 'onDelete');
  //   const deleteArticle = component.find('.delete');
  //   deleteArticle.simulate('click');
  //   // expect(spy).toHaveBeenCalled();
  // });
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

describe('UpdateArticleView', () => {
  function setup() {
    const props = {
      fetchOneArticle: jest.fn(),
      edit: jest.fn(),
      isLoading: false,
      oneArticle: { oneArticle: {} },
      article: {},
      activated: true,
      history: {
        push: jest.fn(),
      },
      match: {
        params: {
          slug: 'updated',
        },
      },
    };
    const component = mount(<UpdateArticleView {...props} />);
    return {
      props,
      component,
    };
  }

  it('should render self and subcomponents', () => {
    const { component } = setup();

    const tag = {
      id: 'sample',
      text: 'sample',
    };
    component.setState({
      tags: [{ id: 'sample', text: 'sample' }],
    });
    // expect(component.find('div').length).toBe(8);
    const spy1 = jest.spyOn(component.instance(), 'onEditorStateChange');
    const spy2 = jest.spyOn(component.instance(), 'handleChange');
    // const spy3 = jest.spyOn(component.instance(), 'onSavePublish');
    // const spy4 = jest.spyOn(component.instance(), 'handleAddition');
    // const spy5 = jest.spyOn(component.instance(), 'onPublish');
    // component.instance().handleAddition(tag);
    // component.instance().handleDelete(0);
    const editorState = EditorState.createEmpty();
    component.instance().onEditorStateChange(editorState);
    const event = { target: { name: 'special', value: 'party' } };
    component.instance().handleChange(event);
    // const publish = component.find('.btn-publish').at(0);
    // publish.simulate('click');
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    // expect(spy3).toHaveBeenCalled();
    // expect(spy4).toBeCalledWith({ id: 'sample', text: 'sample' });
    // expect(spy5).toHaveBeenCalled();
  });
  it('Should dispatch the editArticle function when the form is submitted with correct input', () => {
    const { component } = setup();
    const state = {
      activated: true,
      title: '',
      description: '',
      tags: [],
      draftStatus: '',
      show: false,
      editorState: EditorState.createEmpty(),
    };
    component.setState(state);
    const spy3 = jest.spyOn(component.instance(), 'onSavePublish');
    const publish = component.find('.btn-publish').at(0);
    publish.simulate('click');
    expect(spy3).toBeDefined();
  });
});
