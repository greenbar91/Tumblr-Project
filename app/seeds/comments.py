from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    # User1 comments
    movie_comment = Comment(user_id=1, post_id=5, body="I've been meaning to see it, good to know its worth seeing!")
    tv_comment = Comment(user_id=1, post_id=6, body="I've seen a few episodes, digging it so far, hopefully it stays good throughout")

    # User2 comments
    cat_comment = Comment(user_id=2, post_id=1,body="OMG, what a cute kitty!")
    dog_comment = Comment(user_id=2, post_id=2, body="Adorable. I have a Dachshund mix that likes to sleep all day.")

    # User3 comments
    dinner_comment = Comment(user_id=3, post_id=3, body="Yum! What herbs do you like in your sauce?")
    dessert_comment = Comment(user_id=3, post_id=4, body="Ooooh that sounds so good right now. Was it homemade or store bought?")


    db.session.add(cat_comment)
    db.session.add(dog_comment)
    db.session.add(dinner_comment)
    db.session.add(dessert_comment)
    db.session.add(movie_comment)
    db.session.add(tv_comment)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
