import './UpdatePostModal.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../redux/post.js';

const UpdatePostModal = () => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    return (
        <div className="update-post-modal">
            <h1>Hello from UpdatePostModal</h1>
        </div>
    );
};

export default UpdatePostModal;
