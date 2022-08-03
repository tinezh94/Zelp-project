from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    business_id = IntegerField('business_id', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    review_content = StringField('review_content', validators=[DataRequired()])
    created_at = DateTimeField('created_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
    updated_at = DateTimeField('updateed_at', format="%Y-%m-%d %H:%M:%S", validators=[DataRequired()])
    