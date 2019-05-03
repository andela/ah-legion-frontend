import React from 'react';
import { shallow } from 'enzyme';
import { oneArticle, sampleComments } from '../testData';
import { GetAnArticle, mapDispatchToProps } from '../../containers/GetAnArticle';


describe('GetAnArticle tests', () => {
  it("Should mount GetAnArticle", () => {
    const props = {
        isLoggedIn: true,
        match: {
            params: {
                slug: "ukweli"
            }
        }
    }
      const component = shallow(<GetAnArticle {...props}/>);
      expect(component.find('.an-article')).toHaveLength(1);
   })
   it("Loading should be displayed when fetching articles", () => {
    const props = {
        isFetchingArticle: true,
        match: {
          params: {
            slug: "ukweli"
          }
        }
    }
      const component = shallow(<GetAnArticle {...props}/>);
      expect(component.find('.article-loading').text()).toEqual('Loading...');
   })
   it("Errors should be displayed when fetching articles", () => {
    const props = {
        errors: true,
        match: {
          params: {
            slug: "ukweli"
          }
        }
    }
      const component = shallow(<GetAnArticle {...props}/>);
      expect(component.find('.article-errors').text()).toEqual('Return 404...');
   })
   it("comments-loading should be displayed when fetching comments", () => {
    const props = {
        isFetchingComments: true,
        match: {
          params: {
            slug: "ukweli"
          }
        }
    }
      const component = shallow(<GetAnArticle {...props}/>);
      expect(component.find('.comments-loading').text()).toEqual('Loading...');
   })
});
describe('MapDispatchToProps', () => { 
  const dispatch = jest.fn()
  it('should dispatch fetchTheArticle', () => {
    mapDispatchToProps(dispatch).fetchTheArticle();
    expect(dispatch).toHaveBeenCalled();
  });
  it('should dispatch fetchTheArticleComments', () => {
    mapDispatchToProps(dispatch).fetchTheArticleComments();
    expect(dispatch).toHaveBeenCalled();
  });
});
