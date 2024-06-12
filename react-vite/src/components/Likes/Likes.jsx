import "./Likes.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { FaRegComment } from "react-icons/fa";
import { getUserLikesThunk, deleteLikeThunk, postLikeThunk } from "../../redux/like";
import PostDetailsModel from "../PostDetailsModel";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";


function Likes() {
  const userLikes = useSelector((state) => state.likes.likes);
  // const currentUser = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    dispatch(getUserLikesThunk);
  }, [dispatch]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

    const handleLike = async (postId) => {
    const alreadyLiked = userLikes.some((like) => like.post_id === postId);
    if (alreadyLiked) {
      await dispatch(deleteLikeThunk(postId));
      dispatch(getUserLikesThunk);
    } else {
      await dispatch(postLikeThunk(postId));
      dispatch(getUserLikesThunk);
    }
  };

  console.log(userLikes)

  return (
    <div className="explore">
    <ul className="post-container">
      {userLikes?.map((post) => {
        const hasLiked = userLikes.some((like) => like.post_id === post.post?.id);
        return (
          <li key={post.id} className="post-item">
            <h3 className="post-username"><OpenModalMenuItem onModalClose={closeMenu} itemText={post.post?.poster} modalComponent={<PostDetailsModel post={post.post}/>}/></h3>
            <hr />
            <h2>{post.post?.title}</h2>
            <p>{post.post?.body}</p>
            <div className="post-stats">
              {/* <span>
                <FaRegComment
                />
                {post.post?.comment_count}
              </span> */}
               <span onClick={() => handleLike(post.post?.id)}>
                {hasLiked ? (
                  <FaHeart className="liked" />
                ) : (
                  <FaRegHeart className="un-liked" />
                )}{" "}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
  );
}

export default Likes;
