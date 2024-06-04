from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


def seed_posts():
    # User1 posts
    cat_post = Post(title="My Cat", body="My cat is a tabby, he is adorable", user_id=1)
    dog_post = Post(title="My Dog", body="My dog is a German Shepard. He is a good boy", user_id=1)

    # User2 posts
    dinner_post = Post(title="My Dinner", body="I had spaghetti and meatballs for dinner. I rate it a 8/10!", user_id=2)
    dessert_post = Post(title="My Dessert", body="Check out this delicious chocolate torte I ate!", user_id=2)

    # User3 posts
    movie_post = Post(title="New movie!", body="Just saw the newest Mad Max film. The action shots were incredible!", user_id=3)
    tv_post = Post(title="New TV show", body="Started watching Delicious in Dungeon. Every episode made me hungry.", user_id=3)

    db.session.add(cat_post)
    db.session.add(dog_post)
    db.session.add(dinner_post)
    db.session.add(dessert_post)
    db.session.add(movie_post)
    db.session.add(tv_post)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
