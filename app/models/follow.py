from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follow(db.Model):
    __tablename__ = 'follows'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    
    follower = db.relationship('User', back_populates='follows')
    user = db.relationship('User', back_populates='follows')
    
    def to_dict(self):
        return {
            "id": self.id,
            "follower_id": self.follower_id,
            "user_id": self.user_id
        }