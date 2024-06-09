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

  const sortedComments = comments
  ? [...comments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  : [];

  return (
    <div className="comments-container">
      <ul>
        {sortedComments?.map((comment) => {
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
