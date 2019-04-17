import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { updateProfileInfo } from '../mockData/profile';
import { profile } from '../mockData/profile';
import thunk from 'redux-thunk';
import { UserProfileComponent, mapDispatchToProps } from '../../components/user/UserProfile';
import UserStats from '../../components/user/UserStats';

Enzyme.configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureStore(middleware);
const articles = {
  personalArticles : []
};
const store = mockStore({ articles });

store.articles = articles;
const fetchProfile = jest.fn();

const clickFn = jest.fn();
const profileData = {
  name: 'brian',
};

describe('UserProfile', () => {
  it('renders a single profile page', () => {
    const component = shallow(<UserProfileComponent fetchProfile={fetchProfile} />);
    expect(component).toHaveLength(1);
  });

  it('renders userstats', () => {
    const component = shallow(<UserStats followingNum={20} followersNum={8} articlesNum={8} />);
    expect(component).toHaveLength(1);
  });
  it('renders userstats', () => {
    const component = shallow(<UserProfileComponent />);
    expect(component).toHaveLength(1);
  });
  it('should call update profile function once updateProfile is called from the store', () => {
    const dispatch = jest.fn();

    // For the `mapDispatchToProps`, call it directly but pass in
    // a mock function and check the arguments passed in are as expected

    mapDispatchToProps(dispatch).updateUserProfile();
    expect(dispatch.mock.calls[0][0]).toEqual(expect.any(Function));
});
it('should call fetch profile function once fetchProfile is called from the store', () => {
  const dispatch = jest.fn();

  // For the `mapDispatchToProps`, call it directly but pass in
  // a mock function and check the arguments passed in are as expected

  mapDispatchToProps(dispatch).fetchUserProfile();
  expect(dispatch.mock.calls[0][0]).toEqual(expect.any(Function));
});
});

const initialState = {
  profileData: profile,
  authenticate: true,
};
store.profile = initialState;

describe('<UserProfileComponent />', () => {
  const props = {
    profileData: profile,
    fetchUserProfile: jest.fn(),
    updateUserProfile: jest.fn(),
    authenticated: true,
    profileUpdated: true,
    error: false,
    history: {
      push: jest.fn()
    }
  };

  const wrapper = shallow(<UserProfileComponent {...props} />);
  const wrapperInstance = wrapper.instance();
  it('Should update state whenever data is entered in the input fields', () => {
    const event = {
      target: {
        name: 'username',
        value: '',
      },
    };
    const newProps = {
    ...props,
    authenticated: true,
    }
  const wrapper = shallow(<UserProfileComponent {...newProps} />);
  const wrapperInstance = wrapper.instance();
  expect(wrapperInstance.state.username).toEqual(event.target.value);
  });
  it('Should update state on receiving authenticated true', () => {
    const event = {
      target: {
        name: 'username',
        value: 'seremnn',
      },
    };
    const newProps = {
    ...props,
    authenticated: false,
    }
  const wrapper = shallow(<UserProfileComponent {...newProps} />);
  wrapper.setProps({authenticated:true})
  const wrapperInstance = wrapper.instance();
  expect(wrapperInstance.state.username).toEqual(event.target.value);
  });
  it('Should update state on receiving authenticated false', () => {
  const wrapper = shallow(<UserProfileComponent {...props} />);
  wrapper.setProps({authenticated:false})
  const wrapperInstance = wrapper.instance();
  expect(wrapperInstance.state.username).toEqual("");
  });
  it('Should update state on receiving authenticated false', () => {
    const newProps = {
      ...props,
      profileUpdated:true,
      }
    const wrapper = shallow(<UserProfileComponent {...newProps} />);
    const wrapperInstance = wrapper.instance();
    expect(wrapperInstance.state.username).toEqual("");
    });
  it('Should update state on receiving errors in props', () => {
    const wrapper = shallow(<UserProfileComponent {...props} />);
    const wrapperInstance = wrapper.instance();
    console.log(wrapperInstance.state)
    wrapper.setProps({profileUpdated:true,authenticated:true, error:true, errors: {errors: {username:'not good',profile : {website:['thats not a good one']}}}})
    console.log(wrapperInstance)
    const { formErrorFields } = wrapperInstance.state;
    expect(formErrorFields).toEqual(["username","profile","website",]);
    });
  it('Should update state whenever data is entered in the input fields', () => {
    const event = {
      target: {
        name: 'username',
        value: 'huittr',
      },
    };
    wrapperInstance.forceUpdate();
    wrapperInstance.onChange(event);
    expect(wrapperInstance.state.username).toEqual(event.target.value);
  });

  it('Should dispatch the saveProfile function when the form is submitted with correct input', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        updateUserProfile: jest.fn(),
      },
    };
    const state = {
      email: 'mimi@mail.com',
      username: 'brina',
      showAlert: true,
    };

    wrapperInstance.setState(state);
    wrapperInstance.onProfileSave(event);
    expect(props.updateUserProfile).toHaveBeenCalledWith(updateProfileInfo);
    wrapperInstance.onAlertClick();
    expect(wrapperInstance.state.showAlert).toEqual(false)
  });
});
