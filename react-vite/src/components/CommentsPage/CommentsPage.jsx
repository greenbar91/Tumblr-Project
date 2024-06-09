import { useEffect } from "react";
import "./CommentsPage.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCommentsByPostIdThunk } from "../../redux/comment";

function CommentsPage({ postId }) {
  const dispatch = useDispatch();
  const comments = useSelector(
    (store) => store.comments.comments_by_id?.comments
  );

  useEffect(() => {
    dispatch(getCommentsByPostIdThunk(postId));
  }, [dispatch, postId]);

  return (
    <div className="comments-container">
      <ul>
        {comments?.map((comment) => {
          return (
            <li key={comment?.id}>
              <div>{comment?.username}</div>
              <div>{comment?.body}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CommentsPage;
