from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User
from app.models.comment import Comment
from app.models.like import Like
from app.models.post import Post

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/likes", methods=["GET"])
@login_required
def current_user_likes():
    likes = Like.query.filter_by(user_id=current_user.id).all()

    post_ids = [like.post_id for like in likes]
    posts = Post.query.filter(Post.id.in_(post_ids)).all()
    user_ids = [post.user_id for post in posts]
    users = User.query.filter(User.id.in_(user_ids)).all()

    # Create a map to store post information with counts
    post_map = {}
    for post in posts:
        post_dict = post.to_dict()
        post_dict["comment_count"] = len(Comment.query.filter_by(post_id=post.id).all())
        post_dict["likes_count"] = len(Like.query.filter_by(post_id=post.id).all())
        post_map[post.id] = post_dict

    user_map = {user.id: user.username for user in users}

    likes_list = [
        {
            **like.to_dict(),
            "post": post_map.get(like.post_id),
            "username": user_map.get(post_map.get(like.post_id)["user_id"])
        }
        for like in likes
    ]

    return jsonify({"likes": likes_list})
