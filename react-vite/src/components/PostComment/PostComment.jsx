import "./PostComment.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function PostComment(){
    const dispatch = useDispatch();
    const comments = useSelector((store) => store.comments.comments_by_id?.comments || []);
    const currentUser = useSelector((store)=> store.session.user)
    const [commentText, setCommentText] = useState("");
    const [errors, setErrors] = useState({});


    return (<div>


    </div>)
}

export default PostComment
