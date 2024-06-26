import './DeletePostModal.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/post.js';

const DeletePostModal = ({ postId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deletePost(postId));

        closeModal();
    };

    return (
        <div className="delete-post-modal">
            <h1>Are you sure you want to delete this post?</h1>
            <div className="delete-post-btn-container">
                <button id="keep-post" onClick={closeModal}>Cancel</button>
                <button id="delete-post" onClick={handleDelete}>OK</button>
            </div>
        </div>
    );
};

export default DeletePostModal;
