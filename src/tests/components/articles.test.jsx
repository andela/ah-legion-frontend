import React from 'react';
import { shallow, mount } from 'enzyme';
import { Editor } from 'react-draft-wysiwyg';
import { articles, article } from '../testData';
import Home from '../../components/Home';
import ArticlesByCriteria from '../../components/ArticlesByCriteria';
import AllArticles from '../../components/AllArticles';
import Drafts from '../../components/Drafts';
import CreateArticle from '../../components/CreateArticle';
import { mapStateToProps, mapDispatchToProps as draftDispatch } from '../../containers/DraftsView';
import { mapDispatchToProps } from '../../containers/CreateArticleView';

describe('Home', () => {
  it('renders all divs, h3 and h2 correctly', () => {
    const component = shallow(<Home />);
    expect(component.find('div').length).toEqual(3);
    expect(component.find('h3').length).toEqual(1);
    expect(component.find('h2').length).toEqual(1);
  });
});

describe('DraftView MapStateToProps', () => {
  it('returns the component state', () => {
    const authorArticles = articles;
    expect(mapStateToProps({ authorArticles })).toEqual({
      authorArticles,
    });
  });
});
describe('DraftView MapDispatchToProps', () => {
  const dispatch = jest.fn();
  it('fetch articles function is called', () => {
    draftDispatch(dispatch).fetchArticlesByAuthor();
    draftDispatch(dispatch).deleteArticle('slug');
    expect(dispatch).toHaveBeenCalled();
  });
});
describe('CreateArticleView MapDispatchToProps', () => {
  const dispatch = jest.fn();
  it('fetch articles function is called', () => {
    mapDispatchToProps(dispatch).create(article);
    mapDispatchToProps(dispatch).edit(article, 'slug');
    mapDispatchToProps(dispatch).publish('slug');
    expect(dispatch).toHaveBeenCalled();
  });
});
describe('ArticlesByCriteria ', () => {
  it('renders all articles correctly', () => {
    const component = shallow(
      <ArticlesByCriteria articles={articles} start={0} end={1} />,
    );
    expect(component.find('div.home-view-last')).toBeDefined();
    expect(
      component.contains(<span className="author">Josh_Moracha</span>),
    ).toBeTruthy();
    expect(component.find('div')).toHaveLength(1);
  });
});

describe('AllArticles ', () => {
  it('renders all articles correctly', () => {
    const component = shallow(<AllArticles articles={articles} />);
    expect(component.find('div.home-view-last')).toBeDefined();
    expect(
      component.contains(<span className="author">Josh_Moracha</span>),
    ).toBeTruthy();
    expect(component.find('div')).toHaveLength(4);
  });
});

describe('CreateArticle', () => {
  const props = {
    onSubmit: jest.fn(),
    handleChange: jest.fn(),
    onEditorStateChange: jest.fn(),
    tags: [{ id: 1, test: 'tags' }],
    draftStatus: 'saving',
    handleDelete: jest.fn(),
    handleAddition: jest.fn(),
    handleDrag: jest.fn(),
    onPublish: jest.fn(),
    show: false,
  };
  it('renders all articles correctly', () => {
    const component = shallow(<CreateArticle {...props} />);
    const editor = shallow(<Editor />);
    expect(component.find('div.draft')).toBeDefined();
    expect(component.find('div')).toHaveLength(2);
    expect(editor).toHaveLength(1);
  });
});

describe('Drafts ', () => {
  it('renders all articles correctly', () => {
    const component = mount(<Drafts authorArticles={articles} />);
    expect(component.find('div.draft')).toBeDefined();
    expect(component.find('div')).toHaveLength(8);
  });
});
