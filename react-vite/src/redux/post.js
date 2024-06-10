import { csrfFetch } from './csrf';

const LOAD_ALL_POSTS = 'post/LOAD_ALL_POSTS';
const ADD_POST = 'post/ADD_POST';
const REMOVE_POST = 'post/REMOVE_POST';

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

const removePost = (postId) => {
    return {
        type: REMOVE_POST,
        postId
    };
};

export const fetchAllPostsThunk = () => async (dispatch) => {
    // const response = await fetch(`https://tumblr-project.onrender.com/api/posts/`);
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

export const deletePost = (postId) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${postId}`, { method: 'DELETE' });

    if (response.ok) {
        dispatch(removePost(postId));
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
        case REMOVE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter((post) => post.id !== action.postId)
            };
        default:
            return state;
    }
};

export default postReducer;
