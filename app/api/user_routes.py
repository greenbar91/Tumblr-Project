from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User
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

@user_routes.route('/<string:username>')
@login_required
def user_by_username(username):
    """
    Query for a user by username, returns that user in a dictionary
    """
    user = User.query.filter_by(username=username).first()
    
    if user:
        return user.to_dict()
    
    return jsonify({'errors': {
        'user_not_found': 'Whoops! Thats not a Rumblr user.'
        }}), 400


@user_routes.route("/likes", methods=["GET"])
@login_required
def current_user_likes():
    likes = Like.query.filter_by(user_id=current_user.id).all()

    post_ids = [like.post_id for like in likes]
    posts = Post.query.filter(Post.id.in_(post_ids)).all()
    user_ids = [post.user_id for post in posts]
    users = User.query.filter(User.id.in_(user_ids)).all()

    post_map = {post.id: post.to_dict() for post in posts}
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
