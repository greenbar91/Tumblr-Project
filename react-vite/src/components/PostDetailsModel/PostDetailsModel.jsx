import "./PostDetailsModel.css";
import CommentsPage from "../CommentsPage"

function PostDetailsModel({ post }) {
  let {
    id,
    title,
    body,
    comment_count,
    like_count,
    poster,
    created_at,
    // updated_at,
    // user_id,
  } = post;

  return (
    <div>
      <div>{poster}</div>
      <div>{title}</div>
      <div>{body}</div>
      <div>{created_at}</div>
      <div>{like_count}</div>
      <div>{comment_count}</div>
      <CommentsPage postId={id}/>
    </div>
  );
}

export default PostDetailsModel;
