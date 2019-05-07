import React from 'react';
import { shallow } from 'enzyme';
import { oneArticle, searchMapStateToProps } from '../testData';
import {SearchArticle, mapStateToProps, mapDispatchToProps } from '../../containers/SearchArticle';

describe('SearchArticle tests', () => {
  const props = {
    authorSearchResults: [oneArticle,oneArticle],
    titleSearchResults: [oneArticle,oneArticle],
    tagsSearchResults: [oneArticle,oneArticle],
    bodySearchResults: [oneArticle,oneArticle],
    descriptionSearchResults: [oneArticle,oneArticle],
    authorCount: 0,
    titleCount: 0,
    tagsCount: 0,
    bodyCount: 0,
    descriptionCount: 0,
    authorHasNext: false,
    titleHasNext: false,
    tagsHasNext: false,
    bodyHasNext: false,
    descriptionHasNext: false,
  }
  const component = shallow(<SearchArticle {...props}/>);
  const wrapperInstance = component.instance();
  it("Should mount SearchArticle", () => {
    expect(component.find('#left-tabs-example')).toHaveLength(1);
  })
  it('Should dispatch loadMoreArticles case SEARCH_UPDATE_AUTHOR', () => {
    component.setState({
        key: 'SEARCH_UPDATE_AUTHOR',
    })
    wrapperInstance.forceUpdate();
    wrapperInstance.loadMoreArticles();
    expect(wrapperInstance.state.key).toEqual('SEARCH_UPDATE_AUTHOR');
  });
  it('Should dispatch loadMoreArticles case SEARCH_UPDATE_TITLE', () => {
    component.setState({
        key: 'SEARCH_UPDATE_TITLE',
    })
    wrapperInstance.forceUpdate();
    wrapperInstance.loadMoreArticles();
    expect(wrapperInstance.state.key).toEqual('SEARCH_UPDATE_TITLE');
  });
  it('Should dispatch loadMoreArticles case SEARCH_UPDATE_TAGS', () => {
    component.setState({
        key: 'SEARCH_UPDATE_TAGS',
    })
    wrapperInstance.forceUpdate();
    wrapperInstance.loadMoreArticles();
    expect(wrapperInstance.state.key).toEqual('SEARCH_UPDATE_TAGS');
  });
  it('Should dispatch loadMoreArticles case SEARCH_UPDATE_BODY', () => {
    component.setState({
        key: 'SEARCH_UPDATE_BODY',
    })
    wrapperInstance.forceUpdate();
    wrapperInstance.loadMoreArticles();
    expect(wrapperInstance.state.key).toEqual('SEARCH_UPDATE_BODY');
  });
  it('Should dispatch loadMoreArticles case SEARCH_UPDATE_DESCRIPTION', () => {
    component.setState({
        key: 'SEARCH_UPDATE_DESCRIPTION',
    })
    wrapperInstance.forceUpdate();
    wrapperInstance.loadMoreArticles();
    expect(wrapperInstance.state.key).toEqual('SEARCH_UPDATE_DESCRIPTION');
  });
  it('Should dispatch loadMoreArticles case default', () => {
    component.setState({
        key: null,
    })
    wrapperInstance.forceUpdate();
    wrapperInstance.loadMoreArticles();
    expect(wrapperInstance.state.key).toEqual(null);
  });
  it('Should dispatch selectedTab', () => {
    const myKey = 'SEARCH_UPDATE_DESCRIPTION'
    wrapperInstance.forceUpdate();
    wrapperInstance.selectedTab(myKey);
    expect(wrapperInstance.state.key).toEqual('SEARCH_UPDATE_DESCRIPTION');
  });
  it('Should dispatch loadMoreArticles success case', () => {
    component.setState({
        key: 'SEARCH_UPDATE_AUTHOR',
    })
    component.setProps({
        fetchResultsUpdate: jest.fn(),
        authorHasNext: true
    })
    wrapperInstance.forceUpdate();
    wrapperInstance.loadMoreArticles();
    expect(wrapperInstance.state.key).toEqual('SEARCH_UPDATE_AUTHOR');
  });
});

describe('MapDispatchToProps', () => { 
    const dispatch = jest.fn()
    it('should dispatch fetchResultsUpdate', () => {
      mapDispatchToProps(dispatch).fetchResultsUpdate();
      expect(dispatch).toHaveBeenCalled();
    });
  });

describe('MapStateToProps', () => { 
    const state = {
      searchState: {
        authorSearchResults: [],
        titleSearchResults: [],
        tagsSearchResults: [],
        bodySearchResults: [],
        descriptionSearchResults: [],
        authorCount: 0,
        titleCount: 0,
        tagsCount: 0,
        bodyCount: 0,
        descriptionCount: 0,
        authorHasNext: false,
        titleHasNext: false,
        tagsHasNext: false,
        bodyHasNext: false,
        descriptionHasNext: false,
      },
    };
    it('returns the comments state', () => {
      expect(mapStateToProps(state)).toEqual(searchMapStateToProps);
    });
});
