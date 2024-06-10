from flask import Blueprint, jsonify, redirect, request
from flask_login import current_user, login_required
from app.forms.create_comment import CommentForm
from app.models import Post, Comment
from app.models.db import db
from app.models.user import User

comment_routes = Blueprint('comments', __name__)

#--------------------------------------------------------------------------------------//
#                             GET ALL COMMENTS BY POST ID                              //
#--------------------------------------------------------------------------------------//

@comment_routes.route('/<int:postId>/comments', methods=['GET'])
@login_required
def get_all_comments(postId):
    comments = Comment.query.filter_by(post_id=postId).all()
    comments_with_usernames = []

    for comment in comments:
        comment_dict = comment.to_dict()
        user = User.query.filter_by(id=comment.user_id).first()
        if user:
            comment_dict['username'] = user.username
        comments_with_usernames.append(comment_dict)

    return jsonify({'comments': comments_with_usernames}), 200

#--------------------------------------------------------------------------------------//
#                             CREATE A COMMENT                                         //
#--------------------------------------------------------------------------------------//

@comment_routes.route('/<int:postId>/comments', methods=['POST'])
@login_required
def create_comment(postId):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_comment = Comment(
            user_id=current_user.id,
            post_id=postId,
            body=form.data["body"]
        )

        db.session.add(new_comment)
        db.session.commit()
        return jsonify({'comment':new_comment.to_dict()}), 201
    else:
        return jsonify({'message': 'Validation Error'})

#--------------------------------------------------------------------------------------//
#                             EDIT A COMMENT                                           //
#--------------------------------------------------------------------------------------//
@comment_routes.route("/<int:postId>/comments/<int:commentId>", methods=['PUT'])
@login_required
def edit_comment(postId, commentId):
    com_form = CommentForm()

    if com_form.validate_on_submit():
        the_comment = Comment.query.filter_by(post_id=postId, id=commentId).first()
        the_comment.body = com_form['comment']
        db.session.commit()
        return jsonify({'message': 'Success'})
    return jsonify({'message': 'Validation Error'})
    # The code above successully edits a comment record, needs refactor for frontend/form
    """
    create new comment form
    if form validates retrieve the comment,
    edit the applicable fields with data from form(automatically passed)
    commit to database
    redirect/refresh?
    """

#--------------------------------------------------------------------------------------//
#                             DELETE A COMMENT                                         //
#--------------------------------------------------------------------------------------//
@comment_routes.route('/<int:postId>/<int:commentId>')
@login_required
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
