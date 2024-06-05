from flask import Blueprint, jsonify, request
from app.forms.post_form import PostForm
from app.models import Post, db, Comment, Like
from sqlalchemy import func
from flask_login import current_user, login_required

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
@post_routes.route("/", methods=["POST"])
@login_required
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    current_user_id = current_user.id

    if form.validate_on_submit():
        try:
            new_post = Post(
                title=form.data["title"],
                body=form.data["body"],
                user_id = current_user_id
            )

            db.session.add(new_post)
            db.session.commit()
            return jsonify(new_post.to_dict()), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({"errors": str(e)}), 500

    else:
        errors = {field: error[0] for field, error in form.errors.items()}
        return jsonify({"errors": errors}), 400

#--------------------------------------------------------------------------------------//
#                                     UPDATE POST                                      //
#--------------------------------------------------------------------------------------//
@post_routes.route("/<int:post_Id>", methods=["PUT"])
@login_required
def update_post(post_Id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            post_to_update = Post.query.get(post_Id)

            if not post_to_update:
                    return jsonify({"errors": "Post not found"}), 404

            post_to_update.title = form.data["title"]
            post_to_update.body = form.data["body"]

            db.session.commit()

            return jsonify(post_to_update.to_dict()), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({"errors": str(e)}), 500
#--------------------------------------------------------------------------------------//
#                                     DELETE POST                                      //
#--------------------------------------------------------------------------------------//
@post_routes.route("/<int:post_Id>", methods=["DELETE"])
def delete_post(post_Id):
    try:
        current_post = Post.query.get(post_Id)

        if not current_post:
            return jsonify({"errors": "Post not found"}), 404

        if current_user.id == current_post.user_id:
            return jsonify({"errors":"Unauthorized to delete"}), 401

        db.session.delete(current_post)
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": str(e)}), 500
