from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text

def seed_follows():
    user1_follow_user2 = Follow(follower_id=1, followed_id=2)
    user2_follow_user3 = Follow(follower_id=2, followed_id=3)
    user3_follow_user1 = Follow(follower_id=3, followed_id=1)
    user3_follow_user2 = Follow(follower_id=3, followed_id=2)
    
    db.session.add(user1_follow_user2)
    db.session.add(user2_follow_user3)
    db.session.add(user3_follow_user1)
    db.session.add(user3_follow_user2)
    db.session.commit()

def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()