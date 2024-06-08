import { useEffect } from "react";
import "./CommentsPage.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCommentsByPostIdThunk } from "../../redux/comment";

function CommentsPage({ postId }) {
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.comments.comments.comments);
  console.log(comments)

  useEffect(() => {
    dispatch(getCommentsByPostIdThunk(postId));
  }, [dispatch, postId]);

  return (
    <div className="comments-container">

          <div key={comments?.id}>
            <div>{comments?.id}</div>
            <div>{comments?.body}</div>

          </div>


    </div>
  );
}

export default CommentsPage;
