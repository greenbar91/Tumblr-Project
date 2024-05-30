from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    cat_post_like = Like(user_id=2, post_id=1)

    db.session.add(cat_post_like)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
