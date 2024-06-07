from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db
from app.models.follow import Follow
from app.models.user import User
from flask_login import current_user
from app.forms import FollowForm, PostForm

follow_routes = Blueprint('follows', __name__)

# --------------------------------------------------------------------------------------//
#                                 GET ALL FOLLOWING                                      //
# --------------------------------------------------------------------------------------//

@follow_routes.route('/')
@login_required
def get_all_followings():
    curr_user_id = current_user.id
    print(curr_user_id)
    followed_ids = Follow.query.filter_by(follower_id=curr_user_id).all()
    followed_users = User.query.filter(User.id.in_(tuple([person.to_dict()['followed_id'] for person in followed_ids]))).all()
    return jsonify({'Following': [person.to_dict() for person in followed_users]})

# --------------------------------------------------------------------------------------//
#                                 FOLLOW A USER                                         //
# --------------------------------------------------------------------------------------//
@follow_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def follow_a_user(user_id):
    # print('THIS IS LINE 30 - HELLO)')
    # form = FollowForm()
    # print('THIS IS LINE 32 - HELLO)')
    # form['csrf_token'].data = request.cookies['csrf_token']
   
    follow_user = User.query.filter_by(id=user_id).first()
    
    if follow_user.id:
        new_follow = Follow(follower_id=current_user.id, followed_id=follow_user.id)
        db.session.add(new_follow)
        db.session.commit()
        return jsonify({'message': 'Success'})
    return jsonify({'message': 'Unsuccessful'})

# --------------------------------------------------------------------------------------//
#                                 UNFOLLOW A USER                                       //
# --------------------------------------------------------------------------------------//
@follow_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def unfollow_a_user(user_id):
    unfollow_user = User.query.filter_by(id=user_id).first()
    
    if unfollow_user.id:
        follow_record = Follow.query.filter_by(follower_id=current_user.id, followed_id=user_id).first()
        if follow_record.followed_id:
            db.session.delete(follow_record)
            db.session.commit()
            return jsonify({'message': 'Success'})
    return jsonify({'message': 'Unsuccessful'})