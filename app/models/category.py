from .db import db


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(75), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'category_name': self.category_name
        }

    # business_category = db.relationship('Business', back_populates='category')
    