import "./ManagePosts.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByCurrentUser } from "../../redux/post.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import UpdatePostModal from "../UpdatePostModal";
import PostDetailsModel from "../PostDetailsModel";
import { postLikeThunk, deleteLikeThunk } from "../../redux/like";
import DeletePosts from "../DeletePosts/DeletePosts.jsx";

const ManagePosts = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.postState.allPosts);
  const likes = useSelector((state) => state.likes.likes);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const defaultIcon =
    "https://rumblrbucket.s3.us-east-2.amazonaws.com/DefaultIcon.png";

  useEffect(() => {
    dispatch(getPostsByCurrentUser());
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
    if (!sessionUser) return;

    const alreadyLiked = likes?.some((like) => like.post_id === postId);
    if (alreadyLiked) {
      await dispatch(deleteLikeThunk(postId));
    } else {
      await dispatch(postLikeThunk(postId));
    }
  };

  return (
    <div className="blog">
      <ul className="post-container">
        {posts?.map((post) => {
          const hasLiked = likes?.some((like) => like.post_id === post.id);
          const isPoster = sessionUser?.id === post.user_id;

          return (
            <li key={post.id} className="post-item">
              <div id="pi-user">
                {post.poster && (
                  <img
                    width={50}
                    height={50}
                    src={
                      post.poster.profile_pic
                        ? post.poster.profile_pic
                        : defaultIcon
                    }
                  />
                )}
                {post.poster && (
                  <h3 className="post-username">
                    <OpenModalMenuItem
                      itemText={post.poster.username}
                      modalComponent={<PostDetailsModel post={post} />}
                      onModalClose={closeMenu}
                    />
                  </h3>
                )}
              </div>
              <div id="pi-title">
                <h2>{post?.title}</h2>
              </div>
              <div id="pi-body">
                <p>{post?.body}</p>
              </div>
              {isPoster && (
                <div className="post-utilities">
                  <OpenModalMenuItem
                    itemText={<FaPencil />}
                    modalComponent={
                      <UpdatePostModal
                        postId={post.id}
                        userId={sessionUser.id}
                      />
                    }
                  />
                  <DeletePosts postId={post.id} />
                </div>
              )}
              <div className="post-stats">
                <span onClick={() => handleLike(post.id)}>
                  {hasLiked ? (
                    <FaHeart className="liked" />
                  ) : (
                    <FaRegHeart className="un-liked" />
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ManagePosts;
