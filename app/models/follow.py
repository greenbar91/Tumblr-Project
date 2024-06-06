from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follow(db.Model):
    __tablename__ = 'follows'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True, nullable=False)
    followed_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True, nullable=False)
    
    follower = db.relationship('User', foreign_keys=[follower_id])
    followed = db.relationship('User', foreign_keys=[followed_id])
    
    def to_dict(self):
        return {
            "follower_id": self.follower_id,
            "followed_id": self.followed_id
        }