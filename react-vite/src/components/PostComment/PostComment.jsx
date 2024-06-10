import "./PostComment.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentsByPostIdThunk,
  postCommentByPostIdThunk,
} from "../../redux/comment";
import { fetchPostByIdThunk } from "../../redux/post";
import { PiArrowLineRightBold } from "react-icons/pi";

function PostComment({ postId }) {
  const dispatch = useDispatch();
  //   const comments = useSelector(
  //     (store) => store.comments.comments_by_id?.comments || []
  //   );
  const currentUser = useSelector((store) => store.session.user);
  const [commentText, setCommentText] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchPostByIdThunk(postId));
  }, [dispatch, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newComment = {
      user_id: Number(currentUser.id),
      post_id: postId,
      body: commentText,
    };

    const data = await dispatch(postCommentByPostIdThunk(postId, newComment));

    if (!data?.message) {
      dispatch(fetchPostByIdThunk(postId));
      dispatch(getCommentsByPostIdThunk(postId));
      setCommentText("");
    }

    if (data?.message) {
      setErrors(data);
    }
  };

  return (
    <div className="comment-container">
      <div className="post-comment-container">
        <form className="comment-form" onSubmit={handleSubmit}>
          {errors && <p>{errors.message}</p>}
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-textarea"
            placeholder={`reply as @${currentUser.username}`}
          />
          <button
            type="submit"
            className="submit-comment"
            disabled={commentText.length < 1}
          >
            <PiArrowLineRightBold />
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostComment;
