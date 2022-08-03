from .db import db
from sqlalchemy.sql import func

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_content = db.Column(db.String(2500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_id': self.business_id,
            'rating': self.rating,
            'review_content': self.review_content,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        
    review_owner = db.relationship('User', back_populates="reviews_owned")
    review_business = db.relationship('Business', back_populates="business_reviews")