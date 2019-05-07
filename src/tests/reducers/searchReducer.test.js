import searchReducer from '../../store/reducers/searchReducer';
import {
  GET_SEARCH_RESULTS,
  SEARCH_UPDATE_AUTHOR,
  SEARCH_UPDATE_TITLE,
  SEARCH_UPDATE_TAGS,
  SEARCH_UPDATE_BODY,
  SEARCH_UPDATE_DESCRIPTION,
} from '../../store/actions/actionTypes';
import { searchMapStateToProps, oneArticle } from '../testData';

const initialState = {
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
    authorHasNext: null,
    titleHasNext: null,
    tagsHasNext: null,
    bodyHasNext: null,
    descriptionHasNext: null,
  };

describe('search reducers tests', () => {
    it('should return the initial state', () => {
      expect(searchReducer(undefined, {})).toEqual(initialState);
    });

    it('should change state on action type GET_SEARCH_RESULTS', () => {
        expect(
            searchReducer({}, {
            type: GET_SEARCH_RESULTS,
            payload:{
                author:{
                    results: [],
                    count: 0,
                    next: false
                },
                title:{
                    results: [],
                    count: 0,
                    next: false
                },
                body:{
                    results: [],
                    count: 0,
                    next: false
                },
                description:{
                    results: [],
                    count: 0,
                    next: false
                },
                tags:{
                    results: [],
                    count: 0,
                    next: false
                },
            },
            })
        ).toEqual(searchMapStateToProps)
    })
    it('should change state on action type SEARCH_UPDATE_AUTHOR', () => {
    expect(
      searchReducer(initialState, {
        type: SEARCH_UPDATE_AUTHOR,
        payload:{
            results: [],
            next: null,
        }
      })
    ).toEqual(initialState)
    })
    it('should change state on action type SEARCH_UPDATE_TITLE', () => {
        expect(
          searchReducer(initialState, {
            type: SEARCH_UPDATE_TITLE,
            payload:{
                results: [],
                next: null,
            }
          })
        ).toEqual(initialState)
    })
    it('should change state on action type SEARCH_UPDATE_TAGS', () => {
        expect(
          searchReducer(initialState, {
            type: SEARCH_UPDATE_TAGS,
            payload:{
                results: [],
                next: null,
            }
          })
        ).toEqual(initialState)
    })
    it('should change state on action type SEARCH_UPDATE_BODY', () => {
        expect(
          searchReducer(initialState, {
            type: SEARCH_UPDATE_BODY,
            payload:{
                results: [],
                next: null,
            }
          })
        ).toEqual(initialState)
    })
    it('should change state on action type SEARCH_UPDATE_DESCRIPTION', () => {
        expect(
          searchReducer(initialState, {
            type: SEARCH_UPDATE_DESCRIPTION,
            payload:{
                results: [],
                next: null,
            }
          })
        ).toEqual(initialState)
    })
});
