import "./Explore.css";
import { FaRegTrashAlt, FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLikeThunk, deleteLikeThunk } from "../../redux/like";
import { fetchAllPostsThunk } from "../../redux/post";
import { getCommentsByPostIdThunk } from "../../redux/comment";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeletePostModal from '../DeletePostModal';
import UpdatePostModal from '../UpdatePostModal';
import PostDetailsModel from "../PostDetailsModel";
// import AuthFormModal from "../AuthFormModal";


const Explore = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postState.allPosts);
  const userLikes = useSelector((state) => state.likes.likes);
  const currentUser = useSelector((state) => state.session.user)
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();


  useEffect(() => {
    dispatch(fetchAllPostsThunk());
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

  const closeMenu = () => setShowMenu(false);

  const handleLike = async (postId) => {
    if (!currentUser) {
      return
    }
    const alreadyLiked = userLikes?.some((like) => like.post_id === postId);
    if (alreadyLiked) {
      await dispatch(deleteLikeThunk(postId));
    } else {
      await dispatch(postLikeThunk(postId));
    }
  };

  const handleCommentClick = async (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(postId);
      await dispatch(getCommentsByPostIdThunk(postId));
    }
  };



  return (
    <div className="explore">
      <ul className="post-container grid-item">
        {posts.map((post) => {
          const hasLiked = userLikes?.some((like) => like.post_id === post.id);
          return (
            <li key={post.id} className="post-item">
              <div id="pi-user">
                <h3 className="post-username"><OpenModalMenuItem onModalClose={closeMenu} itemText={post.poster} modalComponent={<PostDetailsModel post={post} />} /></h3>
              </div>
              {/* <hr /> */}
              <div id="pi-title">
                <h1>{post.title}</h1>
              </div>
              <div id="pi-body">
                <p>{post.body}</p>
              </div>

              {/* <div className="post-utilities">
                <OpenModalMenuItem
                  itemText={<FaRegTrashAlt />}
                  modalComponent={<DeletePostModal postId={post.id} userId={currentUser.id} />}
                />

                <OpenModalMenuItem
                  itemText={<FaPencil />}
                  modalComponent={<UpdatePostModal postId={post.id} userId={currentUser.id} />}
                />
              </div> */}

              <div className="post-stats">
                <span>
                  <FaRegComment
                    onClick={() => handleCommentClick(post.id)}
                    className={selectedPostId === post.id ? "active" : ""}
                  />
                  {post.comment_count}
                </span>
                {((currentUser?.id != post?.user_id) || !currentUser) && (<span onClick={() => handleLike(post.id)}>
                  {hasLiked ? (
                    <FaHeart className="liked" />
                  ) : (
                    <FaRegHeart className="un-liked" />
                  )}{" "}

                </span>)}

              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Explore;
