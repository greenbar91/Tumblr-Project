from flask import Blueprint, jsonify, request
from app.models import Post, db, Comment, Like
from sqlalchemy import func

post_routes = Blueprint('posts', __name__)

#--------------------------------------------------------------------------------------//
#                                          GET ALL POSTS                               //
#--------------------------------------------------------------------------------------//

@post_routes.route("/")
def get_all_posts():
    posts = Post.query.all()

    if not posts:
        return jsonify({"errors": "No posts currently listed"}), 404

    result = []
    for post in posts:
        comment_count = Comment.query.filter_by(post_id=post.id).count()
        like_count = Like.query.filter_by(post_id=post.id).count()

        post_dict = post.to_dict()
        post_dict['comment_count'] = comment_count
        post_dict['like_count'] = like_count

        result.append(post_dict)

    return jsonify({"Posts": result}), 200
#--------------------------------------------------------------------------------------//
#                                   GET POSTS BY ID                                    //
#--------------------------------------------------------------------------------------//

@post_routes.route("/<int:post_Id>")
def get_post_by_id(post_Id):
    post_by_id = Post.query.get(post_Id)

    if not post_by_id:
        return jsonify({"errors": "This post does not exist"}), 404

    comment_count = Comment.query.filter_by(post_id=post_by_id.id).count()
    like_count = Like.query.filter_by(post_id=post_by_id.id).count()

    post_dict = post_by_id.to_dict()
    post_dict['comment_count'] = comment_count
    post_dict['like_count'] = like_count

    return jsonify({"post": post_dict}), 200
#--------------------------------------------------------------------------------------//
#                                    CREATE A POST                                     //
#--------------------------------------------------------------------------------------//






























#--------------------------------------------------------------------------------------//
#                                     UPDATE POST                                      //
#--------------------------------------------------------------------------------------//































#--------------------------------------------------------------------------------------//
#                                     DELETE POST                                      //
#--------------------------------------------------------------------------------------//
