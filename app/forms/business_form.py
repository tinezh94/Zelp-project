from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, FloatField
from wtforms.validators import DataRequired

# CATEGORIES = ['American', 'Coffee/Breakfast', 'Chinese', 'Dessert', 'Italian', 'Korean', 'Japanese', 'Pub/Bar', 'Thai', 'Vietnamese']

class BusinessForm(FlaskForm):
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    business_hours = StringField('business_hours', validators=[DataRequired()])
    website = StringField('website')
    price_range = StringField('price_range', validators=[DataRequired()])
    phone_number = StringField('phone_number', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zipcode = StringField('zipcode', validators=[DataRequired()])
    longitude = FloatField('longitude', validators=[DataRequired()])
    latitude = FloatField('latitude', validators=[DataRequired()])
    created_at = DateTimeField('created_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
    updated_at = DateTimeField('updated_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
    