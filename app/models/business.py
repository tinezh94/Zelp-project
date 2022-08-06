from .db import db
from sqlalchemy.sql import func


class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(250), nullable=False, unique=True)
    description = db.Column(db.String(2000), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    business_hours = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(100), nullable=True)
    price_range = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(250), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zipcode = db.Column(db.String(25), nullable=False)
    longitude =db.Column(db.Float(25), nullable=False)
    latitude = db.Column(db.Float(25), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'description': self.description,
            'category': self.category,
            'business_hours': self.business_hours,
            'website': self.website,
            'price_range': self.price_range,
            'phone_number': self.phone_number,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'longitude': self.longitude,
            'latitude': self.latitude,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    owner = db.relationship('User', back_populates="businesses_owned")
    business_reviews = db.relationship('Review', back_populates="review_business", cascade="all, delete")
    business_photos = db.relationship('Bizphoto', back_populates="business", cascade="all, delete")
    
    # category = db.relationship('Category', back_populates='business_category')