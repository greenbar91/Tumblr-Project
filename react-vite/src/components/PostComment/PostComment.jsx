import "./PostComment.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsByPostIdThunk, postCommentByPostIdThunk } from "../../redux/comment";
import { fetchPostByIdThunk } from "../../redux/post";

function PostComment({postId}) {
  const dispatch = useDispatch();
  const comments = useSelector(
    (store) => store.comments.comments_by_id?.comments || []
  );
  const currentUser = useSelector((store) => store.session.user);
  const [commentText, setCommentText] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(()=> {
    dispatch(fetchPostByIdThunk(postId))
  },[dispatch, postId])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

    const newComment = {
        user_id: Number(currentUser.id),
        post_id: postId,
        body: commentText
    }

    const data = await dispatch(postCommentByPostIdThunk(postId, newComment))

    if(!data?.message){
        dispatch(getCommentsByPostIdThunk(postId))
        dispatch(fetchPostByIdThunk(postId))
    }
  }

  return (
    <div className="comment-container">
      <div className="post-comment-container">
        <form className="comment-form" onSubmit={handleSubmit}>

        </form>
      </div>
    </div>
  );
}

export default PostComment;
