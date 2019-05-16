import React from 'react';
import { shallow } from 'enzyme';
import SearchForm from '../../components/SearchForm';

describe('SearchForm tests', () => {
    const component = shallow(<SearchForm />);
    it('Should dispatch the handleChange', () => {
        const event = {
          preventDefault: jest.fn(),
          target: {
            handleChange: jest.fn(),
            name: 'searchInput'
          },
        };
        const state = {
          replyId: 'searchInput',
        };
        const wrapperInstance = component.instance();
        wrapperInstance.setState(state);
        wrapperInstance.handleChange(event);
        expect(wrapperInstance.state.replyId).toEqual("searchInput");
    });
    it('Should dispatch the initialSearch', () => {
        const state = {
          replyId: 'searchInput',
        };
        const wrapperInstance = component.instance();
        wrapperInstance.initialSearch(state);
        expect(wrapperInstance.state.replyId).toEqual("searchInput");
    });
});
