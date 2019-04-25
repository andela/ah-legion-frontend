export const profile = {
  user: {
    username: 'seremnn',
    email: 'serem@testing.com',
    token: '..yourverylongandcomplicatedtokenhere',
    profile: {
      bio: 'ss',
      city: 'mkjbhvg',
      country: '',
      first_name: null,
      following: false,
      image: 'image/upload/v1552193974/gyzbaptikqalgthxfdnh.png',
      image_url: 'https://res.cloudinary.com/dbsri2qtr/image/upload/c_fill,h_150,w_100/gyzbaptikqalgthxfdnh',
      last_name: null,
      phone: 0,
      website: '',
      username: 'seremnn',
    },
  },
};


export const updateProfileInfo = {
  bio: '',
  city: '',
  country: '',
  email: 'mimi@mail.com',
  image: '',
  first_name: '',
  last_name: '',
  phone: null,
  username: 'brina',
  website: '',
};

export const errors = {
  errors: {
    profile: {
      phone: ['A valid integer is required.'],
    },
  },
};

export const allAuthorProfiles = {
  count: 12,
  next: 'http://127.0.0.1:8000/api/profiles/?limit=3&offset=3',
  previous: null,
  results: [
    {
      username: 'BeeSerem',
      first_name: 'Brian',
      last_name: 'Serem',
      bio: "I got enemies, got a lotta enemies\nGot a lotta people tryna drain me of my energy\nThey tryna take the wave from a nigga\nFuckin' with the kid and pray for your nigga",
      image_url: 'https://res.cloudinary.com/dbsri2qtr/image/upload/c_fill,h_150,w_100/gyzbaptikqalgthxfdnh',
      website: 'https://github.com/andela/',
      city: 'Moscow',
      phone: 0,
      country: 'Russia',
    },
    {
      username: 'be2',
      first_name: 'vhvvv',
      last_name: 'vhvvv',
      bio: 'dfedf',
      image_url: 'https://res.cloudinary.com/dbsri2qtr/image/upload/c_fill,h_150,w_100/jb9uk4ntcptwhdppwrz9',
      website: '',
      city: 'ssss',
      phone: 0,
      country: '',
    },
    {
      username: 'brian3',
      first_name: null,
      last_name: null,
      bio: '',
      image_url: 'https://res.cloudinary.com/dbsri2qtr/image/upload/c_fill,h_150,w_100/gyzbaptikqalgthxfdnh',
      website: '',
      city: '',
      phone: 0,
      country: '',
    },
  ],
};

export const followStats = {
  profile: {
    message: 'You are now following brian4',
    user: {
      id: 9,
      username: 'elon',
      followers_total: 0,
      following_total: 1,
    },
  },
};

export const unfollowStats = {
  profile: {
    message: 'You just unfollowed brian4',
    user: {
      id: 9,
      username: 'elon',
      followers_total: 0,
      following_total: 0,
    },
  },
};

export const unfollowAuthorFailed = {
  profile: {
    error: 'You are not following brian4',
  },
};

export const followAuthorFailed = {
  profile: {
    error: 'You are already following brian4',
  },
};

export const authorProfile = {
  profile: {
    username: 'brian4',
    first_name: null,
    last_name: null,
    bio: '',
    image: 'image/upload/v1552193974/gyzbaptikqalgthxfdnh.png',
    image_url: 'https://res.cloudinary.com/dbsri2qtr/image/upload/c_fill,h_150,w_100/gyzbaptikqalgthxfdnh',
    website: '',
    city: '',
    phone: 0,
    country: '',
    following: false,
  },
};

export const failedAllAuthorsProfiles = {
  detail: 'Authentication credentials were not provided.',
};

export const failedAuthorProfile = {
  profile: {
    detail: 'Authentication credentials were not provided.',
  },
};


export const followAuthorProfile = {
  profile: {
    message: 'You are now following brian4',
    current_user: {
      id: 7,
      username: 'beserems',
      followers_total: 0,
      following_total: 1,
    },
    user_of_interest: {
      username: 'brian4',
      first_name: null,
      last_name: null,
      bio: '',
      image: 'image/upload/v1552193974/gyzbaptikqalgthxfdnh.png',
      image_url: 'https://res.cloudinary.com/dbsri2qtr/image/upload/c_fill,h_150,w_100/gyzbaptikqalgthxfdnh',
      website: '',
      city: '',
      phone: 0,
      country: '',
      following: true,
    },
  },
};

export const unfollowAuthorProfile = {
  profile: {
    message: 'You just unfollowed brian4',
    current_user: {
      id: 7,
      username: 'beserems',
      followers_total: 0,
      following_total: 1,
    },
    user_of_interest: {
      username: 'brian4',
      first_name: null,
      last_name: null,
      bio: '',
      image: 'image/upload/v1552193974/gyzbaptikqalgthxfdnh.png',
      image_url: 'https://res.cloudinary.com/dbsri2qtr/image/upload/c_fill,h_150,w_100/gyzbaptikqalgthxfdnh',
      website: '',
      city: '',
      phone: 0,
      country: '',
      following: true,
    },
  },
};