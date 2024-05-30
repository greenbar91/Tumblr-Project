from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    cat_comment = Comment(user_id=2, post_id=1,body="OMG, what a cute kitty!")

    db.session.add(cat_comment)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
