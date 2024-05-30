from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


def seed_posts():
    cat_post = Post(title="My Cat", body="My cat is a tabby, he is adorable", user_id=1)

    db.session.add(cat_post)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
