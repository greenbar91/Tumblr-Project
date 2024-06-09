import { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewPost } from '../../redux/post';

const CreatePostFormModal = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        const errors = {};

        if (!title) {
            errors.title = "Please enter a title";
        }
        if (!body) {
            errors.body = "Please enter the body";
        }

        setValidationErrors(errors);

    }, [title, body]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPostFormData = {
            title,
            body,
            user_id: sessionUser.id
        };

        const newPost = await dispatch(createNewPost(newPostFormData));

        if (newPost) {
            navigate('/');
        }
    };

    return (
        <div>
            <h1>Hello from CreatePostFormModal</h1>
            <p></p>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <input
                    name="body"
                    placeholder="Go ahead, put anything."
                    value={body}
                    onChange={e => setBody(e.target.value)}
                />

                <button type="button" onClick={closeModal}>Close</button>
                <button type="submit" disabled={Object.values(validationErrors).length}>Post now</button>
            </form>
        </div>
    );
};

export default CreatePostFormModal;
