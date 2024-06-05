from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import db
from app.models.like import Like
from app.models.post import Post

like_routes = Blueprint('likes', __name__)


#--------------------------------------------------------------------------------------//
#                                 GET LIKES BY POST ID                                 //
#--------------------------------------------------------------------------------------//
@like_routes.route("/<int:post_Id>/likes", methods=["GET"])
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

#--------------------------------------------------------------------------------------//
#                                      POST LIKE                                       //
#--------------------------------------------------------------------------------------//
@like_routes.route("/<int:post_Id>/likes", methods=["POST"])
@login_required
def post_like(post_Id):
    try:
        current_post = Post.query.get(post_Id)

        if not current_post:
            return jsonify({"errors": "Post not found"}), 404

        if current_user.id == current_post.user_id:
            return jsonify({"errors":"Unauthorized"}), 401

        new_like = Like(
            user_id=current_user.id,
            post_id=current_post.id
        )

        db.session.add(new_like)
        db.session.commit()

        return jsonify({"like":new_like.to_dict()}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": str(e)}), 500

#--------------------------------------------------------------------------------------//
#                                     DELETE LIKE                                      //
#--------------------------------------------------------------------------------------//

