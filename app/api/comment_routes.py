from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required
from app.models import Post, Comment
from app.models.db import db

comment_routes = Blueprint('comments', __name__)

#--------------------------------------------------------------------------------------//
#                             GET ALL COMMENTS BY POST ID                              //
#--------------------------------------------------------------------------------------//


# comment_routes = Blueprint('comments', url_prefix='/api/posts/<int:postId>')

@comment_routes.route('/<int:postId>/comments', methods=['GET'])
def get_all_comments(postId):
    comments = Comment.query.filter_by(post_id=postId).all()
    print(comments)
    return jsonify({'comments':comment.to_dict() for comment in comments}), 200

@comment_routes.route('/<int:postId>/comments', methods=['POST'])
def create_comment(postId):
    data = request.get_json()
    print(data)
    # newComment = Comment(1, postId, 'This is a new comment')
    # db.session.add(newComment)
    # db.session.commit()
    # redirect(f'/api/posts/{postId}/comments')
    return jsonify({'message': 'Testing'}), 200
    """
    create a comment form
    if the form validates create new comment with the form data(automatically retrieved)
    add the comment to database and commit
    redirect/refresh ?
    """
    
@comment_routes.route("/<int:commentId>", methods=['PUT'])
def edit_comment(postId, commentId):
    pass
    """
    create new comment form
    if form validates retrieve the comment,
    edit the applicable fields with data from form(automatically passed)
    commit to database
    redirect/refresh?
    """
    
@comment_routes.route('/<int:postId>/<int:commentId>')
def delete_comment(postId, commentId):
    pass
    """
    retrieve the comment from the database
    call the session delete method on the comment
    commit
    redirect/refresh?
    """
































#--------------------------------------------------------------------------------------//
#                                   CREATE COMMENT                                     //
#--------------------------------------------------------------------------------------//































#--------------------------------------------------------------------------------------//
#                                    UPDATE COMMENT                                    //
#--------------------------------------------------------------------------------------//






























#--------------------------------------------------------------------------------------//
#                                    DELETE COMMENT                                    //
#--------------------------------------------------------------------------------------//
