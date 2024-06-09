from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db
from app.models.follow import Follow
from app.models.user import User
from app.forms import FollowForm

follow_routes = Blueprint('follows', __name__)

# --------------------------------------------------------------------------------------//
#                                 GET ALL FOLLOWING                                      //
# --------------------------------------------------------------------------------------//

@follow_routes.route('/')
@login_required
def get_all_followings():
    curr_user_id = current_user.id
    followed_ids = Follow.query.filter_by(follower_id=curr_user_id).all()
    followed_users = User.query.filter(User.id.in_(tuple([person.to_dict()['followed_id'] for person in followed_ids]))).all()
    return jsonify({person.to_dict()['id']:person.to_dict() for person in followed_users})

# --------------------------------------------------------------------------------------//
#                                 FOLLOW A USER                                         //
# --------------------------------------------------------------------------------------//
@follow_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def follow_a_user(user_id):
   
    follow_user = User.query.filter_by(id=user_id).first()
    
    if follow_user.id and follow_user.id != current_user.id:
        new_follow = Follow(follower_id=current_user.id, followed_id=follow_user.id)
        db.session.add(new_follow)
        db.session.commit()
        return jsonify({'message': 'Success'})
    elif follow_user.id == current_user.id:
        return jsonify({'errors': {'forbidden': "You can't follow yourself. :)"}}), 403
    elif not follow_user:
        return jsonify({'error': 'User not found'}), 400
    else: return jsonify({'message': 'Unsuccessful'}), 500

# --------------------------------------------------------------------------------------//
#                                 UNFOLLOW A USER                                       //
# --------------------------------------------------------------------------------------//
@follow_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def unfollow_a_user(user_id):
    unfollow_user = User.query.filter_by(id=user_id).first()
    
    if unfollow_user.id:
        follow_record = Follow.query.filter_by(follower_id=current_user.id, followed_id=user_id).first()
        if follow_record:
            db.session.delete(follow_record)
            db.session.commit()
            return jsonify(user_id)
    return jsonify({'message': 'Unsuccessful'})