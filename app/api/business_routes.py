from flask import Blueprint, request
from app.forms import BusinessForm
from app.models import Business, db
import os

business_routes = Blueprint('businesses', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@business_routes.route('/google_maps_api')
def google_map_api():
    print('backend', os.environ.get('API_KEY'))
    return {'api_key': os.environ.get('API_KEY')}

@business_routes.route('/')
def all_businesses():
    businesses = Business.query.all()
    return {'businesses': [business.to_dict() for business in businesses]}

@business_routes.route('/<int:id>')
def one_business(id):
    business = Business.query.get(id)
    return business.to_dict()

@business_routes.route('/', methods=['GET', 'POST'])
def create_business():
    form = BusinessForm();
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business = Business(
                            owner_id=form.data['owner_id'],
                            name=form.data['name'],
                            description=form.data['description'],
                            category=form.data['category'],
                            business_hours=form.data['business_hours'],
                            website=form.data['website'],
                            price_range=form.data['price_range'],
                            phone_number=form.data['phone_number'],
                            created_at=form.data['created_at'],
                            updated_at=form.data['updated_at']
        )
        db.session.add(business)
        db.session.commit()
        return business.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@business_routes.route('/<int:id>', methods=['PUT'])
def edit_business(id):
    print('hitting backend route')
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("backend route, edit", form.data)
    if form.validate_on_submit():
        business = Business.query.get(id)
        data = request.json
        business.owner_id = data['owner_id']
        business.name = data['name']
        business.description = data['description']
        business.category = data['category']
        business.business_hours = data['business_hours']
        business.website = data['website']
        business.price_range = data['price_range']
        business.phone_number = data['phone_number']
        business.created_at = data['created_at']
        business.updated_at = data['updated_at']
        db.session.commit()
        print('backend', business.to_dict)
        return business.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@business_routes.route('/<int:id>', methods=['DELETE'])
def delete_business(id):
    business = Business.query.get(id)
    db.session.delete(business)
    db.session.commit()
    return business.to_dict()
