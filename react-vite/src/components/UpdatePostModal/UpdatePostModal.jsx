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
            dispatch(fetchPostByIdThunk(postId));
            closeModal();
        }
    };

    return (
        <div className="update-post-container">
            <p>{sessionUser.username}</p>
            <hr />

            <form onSubmit={handleSubmit} className="update-post-form">
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                {/* {validationErrors.title && <p>{validationErrors.title}</p>} */}

                <textarea
                    type="text"
                    name="body"
                    rows="8"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                >
                </textarea>
                {/* {validationErrors.body && <p>{validationErrors.body}</p>} */}

                <div className="button">
                    <button type="button" id="cancel-update" onClick={closeModal}>Close</button>
                    <button type="submit" id="update-post" disabled={Object.values(validationErrors).length > 0}>Save</button>
                </div>

            </form>
        </div>
    );
};

export default UpdatePostModal;
