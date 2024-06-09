import { csrfFetch } from './csrf';

const LOAD_ALL_POSTS = 'post/LOAD_ALL_POSTS';
const ADD_POST = 'post/ADD_POST';

const loadAllPosts = (posts) => {
    return {
        type: LOAD_ALL_POSTS,
        posts
    };
};

const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    };
};

export const fetchAllPostsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/posts`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllPosts(data.Posts));
    }
};

export const createNewPost = (formData) => async (dispatch) => {
    const response = await csrfFetch(`api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const newPost = await response.json();
        dispatch(addPost(newPost));
        return newPost;
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
        case ADD_POST:
            return {
                ...state,
                allPosts: [...state.allPosts, action.post]
            };
        default:
            return state;
    }
};

export default postReducer;
