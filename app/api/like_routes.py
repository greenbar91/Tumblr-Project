from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import db
from app.models.like import Like
from app.models.post import Post
from app.models import User
from app.models.comment import Comment

like_routes = Blueprint("likes", __name__)


# --------------------------------------------------------------------------------------//
#                                 GET LIKES BY POST ID                                 //
# --------------------------------------------------------------------------------------//
@like_routes.route("/<int:post_Id>/likes", methods=["GET"])
@login_required
def get_likes_by_post_id(post_Id):
    try:
        current_post = Post.query.get(post_Id)

        if not current_post:
            return jsonify({"errors": "Post not found"}), 404

        likes = Like.query.filter_by(post_id=post_Id).all()
        likes_list = [like.to_dict() for like in likes]

        return jsonify({"likes": likes_list}), 200

    except Exception as e:
        return jsonify({"errors": str(e)}), 500


# --------------------------------------------------------------------------------------//
#                                      POST LIKE                                       //
# --------------------------------------------------------------------------------------//
@like_routes.route("/<int:post_Id>/likes", methods=["POST"])
@login_required
def post_like(post_Id):
    try:
        current_post = Post.query.get(post_Id)

        if not current_post:
            return jsonify({"errors": "Post not found"}), 404

        if current_user.id == current_post.user_id:
            return jsonify({"errors": "Unauthorized"}), 401

        existing_like = Like.query.filter_by(user_id=current_user.id, post_id=post_Id).first()

        if existing_like:
            return jsonify({"errors": "Already liked"}), 400


        new_like = Like(user_id=current_user.id, post_id=current_post.id)
        db.session.add(new_like)
        db.session.commit()


        added_like = Like.query.filter_by(user_id=current_user.id, post_id=post_Id).first()

    
        post_dict = current_post.to_dict()
        user = User.query.get(current_post.user_id)
        poster = user.username
        post_dict["comment_count"] = Comment.query.filter_by(post_id=current_post.id).count()
        post_dict["likes_count"] = Like.query.filter_by(post_id=current_post.id).count()
        post_dict["poster"] = poster

        like_response = {
            **added_like.to_dict(),
            "post": post_dict,
        }

        return jsonify({"like": like_response}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": str(e)}), 500


# --------------------------------------------------------------------------------------//
#                                     DELETE LIKE                                      //
# --------------------------------------------------------------------------------------//
@like_routes.route("/<int:post_Id>/likes", methods=["DELETE"])
@login_required
def delete_like(post_Id):
    try:
        current_post = Post.query.get(post_Id)

        if not current_post:
            return jsonify({"errors": "Post not found"}), 404

        like = Like.query.filter_by(post_id=post_Id, user_id=current_user.id).first()

        if not like:
            return jsonify({"errors": "Like not found"}), 404

        db.session.delete(like)
        db.session.commit()

        return jsonify({"message": "Like removed"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": str(e)}), 500
