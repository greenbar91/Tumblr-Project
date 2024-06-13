from flask import Blueprint, jsonify, request
from app.forms.post_form import PostForm
from app.models import Post, db, Comment, Like, User
from sqlalchemy import func
from flask_login import current_user, login_required

from app.models.follow import Follow

post_routes = Blueprint("posts", __name__)

# --------------------------------------------------------------------------------------//
#                                          GET ALL POSTS                               //
# --------------------------------------------------------------------------------------//


@post_routes.route("/")
def get_all_posts():
    posts = Post.query.all()

    if not posts:
        return jsonify({"errors": "No posts currently listed"}), 404

    result = []
    for post in posts:
        comment_count = Comment.query.filter_by(post_id=post.id).count()
        like_count = Like.query.filter_by(post_id=post.id).count()
        user = User.query.get(post.user_id)
        poster = user.to_dict()

        post_dict = post.to_dict()
        post_dict["comment_count"] = comment_count
        post_dict["like_count"] = like_count
        post_dict["poster"] = poster

        result.append(post_dict)

    return jsonify({"Posts": result}), 200


# --------------------------------------------------------------------------------------//
#                              GET POSTS BY CURRENT USER                                //
# --------------------------------------------------------------------------------------//
@post_routes.route("/current", methods=["GET"])
@login_required
def get_user_posts():
    user_id = current_user.id
    posts = Post.query.filter_by(user_id=user_id).all()

    # if not posts:
    #     return jsonify({"errors": "No posts currently posted by current user"}), 404

    posts_list = []
    for post in posts:
        comment_count = Comment.query.filter_by(post_id=post.id).count()
        like_count = Like.query.filter_by(post_id=post.id).count()
        user = User.query.get(post.user_id)
        poster = user

        post_dict = post.to_dict()
        post_dict["comment_count"] = comment_count
        post_dict["like_count"] = like_count
        post_dict["poster"] = poster.to_dict()

        posts_list.append(post_dict)

    return jsonify(posts_list), 200


# --------------------------------------------------------------------------------------//
#                                   GET POSTS BY ID                                    //
# --------------------------------------------------------------------------------------//


@post_routes.route("/<int:post_Id>")
def get_post_by_id(post_Id):
    post_by_id = Post.query.get(post_Id)

    if not post_by_id:
        return jsonify({"errors": "This post does not exist"}), 404

    comment_count = Comment.query.filter_by(post_id=post_by_id.id).count()
    like_count = Like.query.filter_by(post_id=post_by_id.id).count()

    post_dict = post_by_id.to_dict()
    post_dict["comment_count"] = comment_count
    post_dict["like_count"] = like_count

    return jsonify({"post": post_dict}), 200


# --------------------------------------------------------------------------------------//
#                                    CREATE A POST                                     //
# --------------------------------------------------------------------------------------//
@post_routes.route("/", methods=["POST"])
@login_required
def create_post():
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    current_user_id = current_user.id

    if form.validate_on_submit():
        try:
            new_post = Post(
                title=form.data["title"],
                body=form.data["body"],
                user_id=current_user_id,
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


# --------------------------------------------------------------------------------------//
#                                     UPDATE POST                                      //
# --------------------------------------------------------------------------------------//
@post_routes.route("/<int:post_Id>", methods=["PUT"])
@login_required
def update_post(post_Id):
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

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


# --------------------------------------------------------------------------------------//
#                                     DELETE POST                                      //
# --------------------------------------------------------------------------------------//
@post_routes.route("/<int:post_Id>", methods=["DELETE"])
@login_required
def delete_post(post_Id):
    try:
        current_post = Post.query.get(post_Id)

        if not current_post:
            return jsonify({"errors": "Post not found"}), 404

        if current_user.id != current_post.user_id:
            return jsonify({"errors": "Unauthorized to delete"}), 401

        db.session.delete(current_post)
        db.session.commit()

        return jsonify({"message": "Post deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": str(e)}), 500

##--------------------------------------------------------------------------------------//
##                          GET ALL POSTS FROM FOLLOWED USERS                           //
##--------------------------------------------------------------------------------------//
@post_routes.route('/followed_posts', methods=['GET'])
@login_required
def get_followed_posts():
    followed_user_ids = Follow.query.filter_by(follower_id=current_user.id).with_entities(Follow.followed_id).all()
    followed_user_ids = [user_ids[0] for user_ids in followed_user_ids]

    followed_posts = Post.query.filter(Post.user_id.in_(followed_user_ids)).all()

    user_ids = {post.user_id for post in followed_posts}

    users = User.query.filter(User.id.in_(user_ids)).all()
    user_dict = {user.id: user.to_dict() for user in users}

    posts_with_usernames = [
        {
            "id": post.id,
            "title": post.title,
            "body": post.body,
            "user_id": post.user_id,
            "poster": user_dict[post.user_id],
            "created_at": post.created_at,
            "updated_at": post.updated_at
        }
        for post in followed_posts
    ]

    return jsonify(posts_with_usernames)
