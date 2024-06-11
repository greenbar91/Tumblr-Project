import './ManagePosts.css';
import { FaRegTrashAlt, FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByCurrentUser } from '../../redux/post.js';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeletePostModal from '../DeletePostModal';
import UpdatePostModal from '../UpdatePostModal';
import PostDetailsModel from '../PostDetailsModel';

const ManagePosts = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector((state) => state.postState.allPosts);
    const likes = useSelector((state) => state.likes.likes);

    const [selectedPostId, setSelectedPostId] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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
        <div className="blog">
            <ul className="post-container">
                {posts.map((post) => {
                    const hasLiked = likes.some((like) => { like.post_id === post.id });
                    const isPoster = sessionUser.id === post.user_id;
                    return (
                        <li key={post.id} className="post-item">
                            <div id="pi-user">
                                <h3 className="post-username">
                                    <OpenModalMenuItem
                                        itemText={post.poster}
                                        modalComponent={<PostDetailsModel post={post} />}
                                        onModalClose={closeMenu}
                                    />
                                </h3>
                            </div>
                            {/* <hr /> */}
                            <div id="pi-title">
                                <h2>{post.title}</h2>
                            </div>
                            <div id="pi-body">
                                <p>{post.body}</p>
                            </div>

                            <div className="post-utilities">
                                <OpenModalMenuItem
                                    itemText={<FaRegTrashAlt />}
                                    modalComponent={<DeletePostModal postId={post.id} userId={sessionUser.id} />}
                                />

                                <OpenModalMenuItem
                                    itemText={<FaPencil />}
                                    modalComponent={<UpdatePostModal postId={post.id} userId={sessionUser.id} />}
                                />
                            </div>

                            <div className="post-stats">
                                <span>
                                    <FaRegComment
                                        onClick={() => handleCommentClick(post.id)}
                                        className={selectedPostId === post.id ? "active" : ""}
                                    />
                                    {post.comment_count}
                                </span>

                                {(!isPoster || !sessionUser) && (
                                    <span onClick={() => handleLike(post.id)}>
                                        {hasLiked ? (
                                            <FaHeart className="liked" />
                                        ) : (
                                            <FaRegHeart className="un-liked" />
                                        )}
                                        {" "}
                                    </span>)}
                            </div>

                            <div className="post-stats"></div>

                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ManagePosts;
