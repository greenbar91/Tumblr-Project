from datetime import datetime, timezone
from flask import Blueprint, jsonify, redirect, request
from flask_login import current_user, login_required
from app.forms.create_comment import CommentForm
from app.models import Comment
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
            body=form.data["body"],
            created_at=datetime.now(timezone.utc)
        )

        db.session.add(new_comment)
        db.session.commit()
        return jsonify({'comment':new_comment.to_dict()}), 201
    else:
        return jsonify({'message': 'Validation Error'})

#--------------------------------------------------------------------------------------//
#                             EDIT A COMMENT                                           //
#--------------------------------------------------------------------------------------//
@comment_routes.route('/comments/<int:commentId>', methods=['PUT'])
@login_required
def update_comment(commentId):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        comment = Comment.query.get(commentId)

        if comment is None:
            return jsonify({'message': 'Comment not found'}), 404

        if comment.user_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403

        comment.body = form.data["body"]
        db.session.commit()
        return jsonify({'comment': comment.to_dict()}), 200
    else:
        return jsonify({'message': 'Validation Error'}), 400

#--------------------------------------------------------------------------------------//
#                             DELETE A COMMENT                                         //
#--------------------------------------------------------------------------------------//
@comment_routes.route('/comments/<int:commentId>', methods=["DELETE"])
@login_required
def delete_comment(commentId):
    comment = Comment.query.filter_by(id=commentId).first()
    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message":"Successfully deleted"}), 200
