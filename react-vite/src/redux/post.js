import { csrfFetch } from './csrf';

const LOAD_ALL_POSTS = 'post/LOAD_ALL_POSTS';

const loadAllPosts = (posts) => {
    return {
        type: LOAD_ALL_POSTS,
        posts
    };
};

export const fetchAllPostsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/posts`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllPosts(data.Posts));
    }
};

const initialState = {
    allPosts: []
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_POSTS:
            return {
                ...state,
                allPosts: action.posts
            };
        default:
            return state;
    }
};

export default postReducer;
