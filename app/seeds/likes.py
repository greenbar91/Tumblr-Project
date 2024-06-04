from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    # User1 Likes
    movie_post_like = Like(user_id=1, post_id=5)
    tv_post_like = Like(user_id=1, post_id=6)

    # User2 Likes
    cat_post_like = Like(user_id=2, post_id=1)
    dog_post_like = Like(user_id=2, post_id=2)

    # User3 Likes
    dinner_post_like = Like(user_id=3, post_id=3)
    dessert_post_like = Like(user_id=3, post_id=4)

    db.session.add(cat_post_like)
    db.session.add(dog_post_like)
    db.session.add(dinner_post_like)
    db.session.add(dessert_post_like)
    db.session.add(movie_post_like)
    db.session.add(tv_post_like)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
