import { csrfFetch } from './csrf';

const LOAD_ALL_POSTS = 'post/LOAD_ALL_POSTS';
const ADD_POST = 'post/ADD_POST';
const GET_POST_BY_ID = "post/getPostById"

const loadAllPosts = (posts) => {
    return {
        type: LOAD_ALL_POSTS,
        payload: posts
    };
};

const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    };
};

const getPostById = (post) => {
    return {
        type: GET_POST_BY_ID,
        payload: post
    };
};


export const fetchAllPostsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllPosts(data.Posts));
    }
};

export const getPostsByCurrentUser = () => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/current`);

    if (response.ok) {
        const posts = await response.json();
        dispatch(loadAllPosts(posts));
    }
};

export const createNewPost = (formData) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/`, {
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

export const fetchPostByIdThunk = (postId) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${postId}`);

    if (response.ok) {
        const post = await response.json();
        dispatch(getPostById(post));
    } else {
        const errors = await response.json();
        return errors;
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
                allPosts: action.payload
            };
        case ADD_POST:
            return {
                ...state,
                allPosts: [...state.allPosts, action.post]
            };
        case GET_POST_BY_ID:
            return {
                ...state,
                currentPost: action.payload
            };
        default:
            return state;
    }
};

export default postReducer;
