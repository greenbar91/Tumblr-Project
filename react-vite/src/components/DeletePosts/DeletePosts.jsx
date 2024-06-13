import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deletePost,
  getPostsByCurrentUser,
} from "../../redux/post";
import { FaRegTrashAlt, FaCheck, FaTimes } from "react-icons/fa";
import "./DeletePosts.css"

function DeletePosts({ postId }) {
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    dispatch(deletePost(postId));


    setTimeout(() => {
      dispatch(getPostsByCurrentUser());
    }, 300);

    setShowConfirmation(false);
  };

  return (
    <div className="delete-post-container2">
      {showConfirmation ? (
        <div className="delete-confirmation2">
          <FaCheck onClick={handleDelete} className="confirm-icon2" />
          <FaTimes onClick={() => setShowConfirmation(false)} className="cancel-icon2" />
        </div>
      ) : (
        <FaRegTrashAlt onClick={() => setShowConfirmation(true)} className="delete-button2" />
      )}
    </div>
  );
}

export default DeletePosts;
