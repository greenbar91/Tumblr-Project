import "./Likes.css";
import { useSelector } from "react-redux";

function Likes() {
  // const dispatch = useDispatch();
  const likes = useSelector((store) => store.session.likes);



  return (
    <div className="center-container">
      <div className="likes-container">
      {likes ? (
          likes.map((like) => (
            <div key={like.id} className="post">
                <h3>{like.username}</h3>
              <h3>{like.post.title}</h3>
              <p>{like.post.body}</p>
            </div>
          ))
        ) : (
          <p>No liked posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Likes;
