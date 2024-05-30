from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.String(4096), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))


    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post', cascade='all, delete-orphan')
    # likes = db.relationship('Like', back_populates='post', cascade='all, delete-orphan')
    # follows = db.relationship('Follow', back_populates='post', cascade='all, delete-orphan')



    def to_dict(self):
          return {
                "id": self.id,
                "title": self.title,
                "body": self.body,
                "user_id": self.user_id,
                "created_at": self.created_at,
                "updated_at": self.updated_at
          }
