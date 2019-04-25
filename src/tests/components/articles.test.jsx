import React from 'react';
import { shallow, mount } from 'enzyme';
import { Editor } from 'react-draft-wysiwyg';
import { articles, article, articleBatch } from '../testData';
import { Home, mapStateToProps, mapDispatchToProps } from "../../components/Home";
import ArticlesByCriteria from '../../components/ArticlesByCriteria';
import AllArticles from '../../components/AllArticles';
import Drafts from '../../components/Drafts';
import CreateArticle from '../../components/CreateArticle';
import { mapStateToProps as mapState} from '../../containers/DraftsView';
import { mapDispatchToProps as mapDispatch} from '../../containers/CreateArticleView';

describe("Home", () => {
  it("renders all divs, h3 and h2 correctly", () => {
    const props = {
      articles: { results: [], next: "http:www.example.com" }
    };
    const component = shallow(<Home {...props} />);
    expect(component.find("div").length).toEqual(3);
    expect(component.find("h3").length).toEqual(1);
    expect(component.find("h2").length).toEqual(1);
  });
  it("mapStateToProps should work as intended", () => {
    const state = {
      articles: { articles: { next: "", previous: "" } }
    };
    const wrapper = shallow(<Home />);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.setState({ ...state });

    const expectedState = {
      articles: { articles: { next: "", previous: "" } },
      next: "",
      previous: ""
    };
    expect(mapStateToProps({ ...state })).toEqual(expectedState);
  });
});

describe('DraftView MapStateToProps', () => {
  it('returns the component state', () => {
    const authorArticles = articles;
    expect(mapState({ authorArticles })).toEqual({
      authorArticles,
    });
  });
});
describe('CreateArticleView MapDispatchToProps', () => {
  const dispatch = jest.fn();
  it('fetch articles function is called', () => {
    mapDispatch(dispatch).create(article);
    mapDispatch(dispatch).edit(article, 'slug');
    mapDispatch(dispatch).publish('slug');
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

describe("AllArticles ", () => {
  it("renders all articles correctly", () => {
    const component = shallow(<AllArticles articles={articles} />);
    expect(component.find("div.home-view-last")).toBeDefined();
    expect(
      component.contains(<span className="author">Josh_Moracha</span>)
    ).toBeTruthy();
    expect(component.find("div")).toHaveLength(4);
  });
  it("renders all articles correctly", () => {
    const component = mount(<Home articles={articleBatch} />);
    const wrapperInstance = component.instance();
    const createSpy = toSpy => jest.spyOn(wrapperInstance, toSpy);
    const loadMore = createSpy("loadMore");
    wrapperInstance.setState({next: null, previous: true})
    wrapperInstance.forceUpdate();
    wrapperInstance.loadMore(window.onscroll);
    expect(loadMore).toHaveBeenCalled();
  });
});

describe("AllArticles when the count is less than 10", () => {
  it("state displays that there are no more articles to load", () => {
    const props = {
      count: 7,
    }
    const component = mount(<Home articles={articles} {...props}/>);
    const wrapperInstance = component.instance();
    wrapperInstance.forceUpdate();
    wrapperInstance.loadMore();
    expect(wrapperInstance.state).toEqual({hasMoreItems: false});
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
