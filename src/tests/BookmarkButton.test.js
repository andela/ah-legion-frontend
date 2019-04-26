import { shallow, mount } from 'enzyme';
import React from 'react';
import { ConnectedBookmarkButton, mapDispatchToProps } from '../components/BookmarkButton';

describe('Bookmark button', () => {
  const props = {
    CheckIfBookmarked: jest.fn(() => {
      Promise.resolve();
    }),
    BookmarkArticle: jest.fn(() => {
      Promise.resolve();
    }),
    ...{ isArticleBookmarked: false, isLoggedIn: false, slug: 'p-o-p', bookmarks: [], article: {} },
  };

  it('renders one span', () => {
    const wrapper = shallow(<ConnectedBookmarkButton {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  it("submit button should be disabled when the user presses it", () => {
    const wrapper = shallow(<ConnectedBookmarkButton {...props} />);
    const instance = wrapper.instance()
    const event = {
      preventDefault: jest.fn()
    };
    instance.handleSubmit(event);
    expect(props.RegisterUser).not.toHaveBeenCalled()
  })

  it('should call register when submit button is clicked', () => {
    const wrapper = mount(<ConnectedBookmarkButton {...props} />);
    const instance = wrapper.instance()
    const event = {
      preventDefault: jest.fn()
    };

    instance.setState(state);
    instance.handleSubmit(event);
    expect(props.RegisterUser).toHaveBeenCalled()
  });


  it("should call handleChange when input value is changed", () => {
    const wrapper = mount(<ConnectedBookmarkButton {...props} />);
    const instance = wrapper.instance()
    const createSpy = toSpy => jest.spyOn(instance, toSpy);
    const handleChange = createSpy("handleChange");
    instance.forceUpdate();
    const input = wrapper.find('#username').at(1);
    input.simulate("change");
    expect(handleChange).toHaveBeenCalled();
  });

})

describe('MapDispatchToProps', () => { 
  const payload = { isRegister: true, modalShow: true }
  const dispatch = jest.fn()
  it('register user function is called', () => {
    mapDispatchToProps(dispatch).RegisterUser(payload);
    expect(dispatch).toHaveBeenCalled();
  });
});
