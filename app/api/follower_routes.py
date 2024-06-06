from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import db
from app.models.follow import Follow
from app.models.user import User
from flask_login import current_user

follow_routes = Blueprint('follows', __name__)

# --------------------------------------------------------------------------------------//
#                                 GET ALL FOLLOWING                                      //
# --------------------------------------------------------------------------------------//

@follow_routes.route('/')
def get_all_followings():
    curr_user_id = 3
    followed_ids = Follow.query.filter_by(follower_id=curr_user_id).all()
    followed_users = User.query.filter(User.id.in_(tuple([person.to_dict()['followed_id'] for person in followed_ids]))).all()
    return jsonify({'Following': [person.to_dict() for person in followed_users]})