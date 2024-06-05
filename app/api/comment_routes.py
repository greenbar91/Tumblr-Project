from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required
from app.forms.create_comment import CommentForm
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

#--------------------------------------------------------------------------------------//
#                             CREATE A COMMENT                              //
#--------------------------------------------------------------------------------------//

@comment_routes.route('/<int:postId>/comments', methods=['POST'])
def create_comment(postId):
    newComment = Comment(user_id=2, post_id=postId, body='This is a new comment...again')
    # db.session.add(newComment)
    # db.session.commit()
    return jsonify({'message': 'Success'}), 200
    # Code needs form/frontend data. Creates record successfully with test code above
    """
    create a comment form
    if the form validates create new comment with the form data(automatically retrieved)
    add the comment to database and commit
    redirect/refresh ?
    """
  
  #--------------------------------------------------------------------------------------//
#                             EDIT A COMMENT                              //
#--------------------------------------------------------------------------------------//  
@comment_routes.route("/<int:postId>/comments/<int:commentId>", methods=['PUT'])
def edit_comment(postId, commentId):
    the_comment = Comment.query.filter_by(post_id=postId, id=commentId).first()
    print(the_comment.body)
    the_comment.body = 'I edited the comment :)'
    db.session.commit()
    return jsonify({'message': 'Success'})
    # The code above successully edits a comment record, needs refactor for frontend/form
    """
    create new comment form
    if form validates retrieve the comment,
    edit the applicable fields with data from form(automatically passed)
    commit to database
    redirect/refresh?
    """

#--------------------------------------------------------------------------------------//
#                             DELETE A COMMENT                              //
#--------------------------------------------------------------------------------------//
@comment_routes.route('/<int:postId>/<int:commentId>')
def delete_comment(postId, commentId):
    the_comment = Comment.query.filter_by(post_id=postId, id=commentId).first()
    db.session.delete(the_comment)
    db.session.commit()
    """
    retrieve the comment from the database
    call the session delete method on the comment
    commit
    redirect/refresh?
    """