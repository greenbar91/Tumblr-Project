import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../../redux/post';

const Explore = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postState.allPosts);

    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [dispatch]);

    return (
        <div>
            <ul>
                {posts.map((post) => {
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <div>
                            <span>Comments: {post.comment_count}</span>
                            <span>Likes: {post.like_count}</span>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    );

};

export default Explore;
