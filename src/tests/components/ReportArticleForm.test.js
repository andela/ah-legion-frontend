import React from 'react';
import { shallow } from 'enzyme';
import { ReportArticleForm, mapDispatchToProps, mapStateToProps } from '../../components/ReportArticleForm';

const props = {
    isLoading: true,
    reportArticle: jest.fn(),
    articleReporter: jest.fn(),
    ReportArticleForm: jest.fn(() => {
      Promise.resolve();
    }),
    ...{ errors: {}, isLoading: false },
  };

  describe('Report Article form tests', () => {
    const component = shallow(<ReportArticleForm {...props}/>);
    component.setProps({
        reportArticle: jest.fn(),
    })
    it('confirm that a comment component is mounted', () => {
      const wrapperInstance = component.instance();
      expect(component.find('div')).toBeDefined();
    });
    it('Should dispatch the handleChange', () => {
        const event = {
          preventDefault: jest.fn(),
          target: {
            handleChange: jest.fn(),
            name: 'reportedArticle'
          },
        };
        const state = {
          replyId: 'reportedArticle',
        };
        const wrapperInstance = component.instance();
        wrapperInstance.setState(state);
        wrapperInstance.handleChange(event);
        expect(wrapperInstance.state.replyId).toEqual("reportedArticle")
    });
    it('Should dispatch the reportArticle', () => {
        const event = {
          preventDefault: jest.fn(),
          target: {
            reportArticle: jest.fn(),
            name: 'reportedArticle'
          },
        };
        const state = {
          replyId: 'reportedArticle',
        };
        const wrapperInstance = component.instance();
        wrapperInstance.setState(state);
        wrapperInstance.reportArticle(event);
        expect(wrapperInstance.state.replyId).toEqual("reportedArticle")
    });
  });
  describe('MapDispatchToProps', () => { 
    const dispatch = jest.fn()
    it('should dispatch articleReporter', () => {
      mapDispatchToProps(dispatch).articleReporter();
      expect(dispatch).toHaveBeenCalled();
    });
  });
  describe('MapStateToProps', () => { 
    const state = {modalState: { slug: 'bb' }}
    const expected = { slug: 'bb'}
    it('returns the modal state', () => {
      expect(mapStateToProps(state)).toEqual(expected)
    });
});
 
