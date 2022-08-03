from flask import Blueprint, request
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def all_reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/<int:business_id>', methods=['GET', 'POST'])
def create_review(business_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(
                        user_id=form.data['user_id'],
                        business_id=form.data['business_id'],
                        rating=form.data['rating'],
                        review_content=form.data['review_content'],
                        created_at=form.data['created_at'],
                        updated_at=form.data['updated_at']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()

@review_routes.route('/<int:id>', methods=['PUT'])
def edit_review(id):
    form=ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(id)
        data = request.json
        review.user_id = data['user_id']
        review.business_id = data['business_id']
        review.rating = data['rating']
        review.review_content = data['review_content']
        review.created_at = data['created_at']
        review.updated_at = data['updated_at']
        db.session.commit()
        return review.to_dict()

@review_routes.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return review.to_dict()