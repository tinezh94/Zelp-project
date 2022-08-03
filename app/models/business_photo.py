from .db import db

class Bizphoto(db.Model):
    __tablename__="business_photos"

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    image = db.Column