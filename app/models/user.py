from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255), default='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVAsYAAWUbB2YPxq9pECm6rDAjpJlwnUnfKA&usqp=CAU')
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'created_at': self.created_at,
            'profile_pic': self.profile_pic
        }


    businesses_owned = db.relationship('Business', back_populates='owner', )
    reviews_owned = db.relationship('Review', back_populates='review_owner')
    image_uploaded = db.relationship('Bizphoto', back_populates='image_owner')
    