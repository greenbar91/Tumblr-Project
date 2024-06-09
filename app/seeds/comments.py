from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    # User1 comments
    movie_comment = Comment(user_id=1, post_id=5, body="I've been meaning to see it, good to know its worth seeing!")
    movie2_comment = Comment(user_id=1, post_id=5, body="Just saw it, it was decent but I prefer the first one. The action scenes were great though!")
    tv_comment = Comment(user_id=1, post_id=6, body="I've seen a few episodes, digging it so far, hopefully it stays good throughout")
    tv2_comment = Comment(user_id=1, post_id=6, body="Just binged the entire show! Not every episode was amazing but it was still very comfy. Made me hungry!")
    dinner3_comment = Comment(user_id=1, post_id=3, body="Delicious!")
    dinner4_comment = Comment(user_id=1, post_id=3, body="Have you tried making pesto?")
    dessert3_comment = Comment(user_id=1, post_id=4, body="My favorite is tres leches")
    dessert4_comment = Comment(user_id=1, post_id=4, body="I can post my recipe for it later if you want?")

    # User2 comments
    cat_comment = Comment(user_id=2, post_id=1,body="OMG, what a cute kitty!")
    cat2_comment = Comment(user_id=2, post_id=1,body="What's your cats' name?")
    dog_comment = Comment(user_id=2, post_id=2, body="Adorable. I have a Dachshund mix that likes to sleep all day.")
    dog2_comment = Comment(user_id=2, post_id=2, body="Do you take him on long walks in the summer? That would make him a hot dog! lol")
    movie3_comment = Comment(user_id=2, post_id=5, body="Great movie")
    movie4_comment = Comment(user_id=2, post_id=5, body="I just had a marathon, watching all the original films plus the modern ones!")
    tv3_comment = Comment(user_id=2, post_id=6, body="Have you read the Manga?")
    tv4_comment = Comment(user_id=2, post_id=6, body="It goes into more details with the food, I love it")

    # User3 comments
    dinner_comment = Comment(user_id=3, post_id=3, body="Yum! What herbs do you like in your sauce?")
    dinner2_comment = Comment(user_id=3, post_id=3, body="Just got some fresh oregano, going to try and replicate your dish!")
    dessert_comment = Comment(user_id=3, post_id=4, body="Ooooh that sounds so good right now. Was it homemade or store bought?")
    dessert2_comment = Comment(user_id=3, post_id=4, body="Get back to me when you can! If its storebought I'd love to know where you got it")
    cat3_comment = Comment(user_id=3, post_id=1,body="I had a persian cat growing up, I miss that fluffy goofball")
    cat4_comment = Comment(user_id=3, post_id=1,body="His name was Socks and he was sooo chill")
    dog3_comment = Comment(user_id=3, post_id=2, body="Reminds me of my buddies husky. Beautiful dog but always got in trouble!")
    dog4_comment = Comment(user_id=3, post_id=2, body="We don't deserve dogs")



    db.session.add(cat_comment)
    db.session.add(cat2_comment)
    db.session.add(cat3_comment)
    db.session.add(cat4_comment)



    db.session.add(dog_comment)
    db.session.add(dog2_comment)
    db.session.add(dog3_comment)
    db.session.add(dog4_comment)


    db.session.add(dinner_comment)
    db.session.add(dinner2_comment)
    db.session.add(dinner3_comment)
    db.session.add(dinner4_comment)


    db.session.add(dessert_comment)
    db.session.add(dessert2_comment)
    db.session.add(dessert3_comment)
    db.session.add(dessert4_comment)


    db.session.add(movie_comment)
    db.session.add(movie2_comment)
    db.session.add(movie3_comment)
    db.session.add(movie4_comment)


    db.session.add(tv_comment)
    db.session.add(tv2_comment)
    db.session.add(tv3_comment)
    db.session.add(tv4_comment)


    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
