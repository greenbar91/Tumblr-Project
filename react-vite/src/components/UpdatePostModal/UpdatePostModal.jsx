import './UpdatePostModal.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { fetchPostByIdThunk, updatePost } from '../../redux/post.js';

const UpdatePostModal = ({ postId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    // Fetch the specific post whent the component mount
    useEffect(() => {
        dispatch(fetchPostByIdThunk(postId));
    }, [dispatch, postId]);

    const post = useSelector((state) => state.postState.currentPost?.post);
    const sessionUser = useSelector((state) => state.session.user);

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    // Update the state once the post data is available
    useEffect(() => {
        if (post) {
            setTitle(post.title || '');
            setBody(post.body || '');
        }
    }, [post]);

    useEffect(() => {
        const errors = {};

        if (!title) {
            errors.title = "Please enter a title"
        }
        if (!body) {
            errors.body = "Please enter the body"
        }

        setValidationErrors(errors);

    }, [title, body]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPostFormData = {
            title,
            body,
            user_id: sessionUser.id,
            created_at: new Date().toISOString()
        };

        const updatedPost = await dispatch(updatePost(updatedPostFormData, postId));

        if (updatedPost) {
            closeModal();
        }
    };

    return (
        <div className="update-post-modal">
            <h1>Hello from UpdatePostModal</h1>
            <p>{sessionUser.username}</p>
            <hr />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                {validationErrors.title && <p>{validationErrors.title}</p>}

                <input
                    type="text"
                    name="body"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                />
                {validationErrors.body && <p>{validationErrors.body}</p>}

                <button type="button" onClick={closeModal}>Close</button>
                <button type="submit" disabled={Object.values(validationErrors).length > 0}>Save</button>

            </form>
        </div>
    );
};

export default UpdatePostModal;
