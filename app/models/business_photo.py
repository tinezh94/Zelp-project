from .db import db

class Bizphoto(db.Model):
    __tablename__="business_photos"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_id': self.business_id,
            'image_url': self.image_url
        }

    image_owner = db.relationship('User', back_populates='image_uploaded')
    business = db.relationship('Business', back_populates='business_photos')
    # review = db.relationship('Review', back_populates='review_photos')