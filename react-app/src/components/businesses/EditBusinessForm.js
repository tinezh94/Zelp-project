import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { deleteBusiness, editBusiness, loadBusinesses } from '../../store/business';
import { loadCategories } from '../../store/category';

const EditBusinessForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();

    const priceRangeArr = ['$', '$$', '$$$', '$$$$']

    const user = useSelector(state => state?.session?.user);
    const categories = useSelector(state => state?.categories);
    const businesses = useSelector(state => state?.businesses);
    console.log("edit business")
    const businessesArr = businesses ? Object.values(businesses) : null;
    const categoriesArr = categories ? Object.values(categories) : null;

    let business = businessesArr.filter(business => {
        return business?.id === Number(businessId);
    });
    
    business = business[0];
    console.log(business?.name)

    useEffect(async () => {
        await dispatch(loadCategories());
        await dispatch(loadBusinesses());
    }, [dispatch]);

    const [ editName, setEditName ] = useState(business?.name);
    const [ editDescription, setEditDescription ] = useState(business?.description);
    const [ editCategory, setEditCategory ] = useState(business?.category);
    const [ editBusinessHours, setEditBusinessHours ] = useState(business?.business_hours);
    const [ editWebsite, setEditWebsite ] = useState(business?.website ? business?.website : '');
    const [ editPriceRange, setEditPriceRange ] = useState(business?.price_range);
    const [ editPhone, setEditPhone ] = useState(business?.phone_number);
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

    const phoneNumber = /^\(?([0-9]{3})\)?(\-[0-9]{3})(\-[0-9]{4})$/;

    useEffect(() => {
        const errors = [];

        if (!editName) errors.push('Business name cannot be empty')
        // if (businessesArr?.map(business => business.name).includes(editName)) errors.push('Business name must be unique');
        if (!editDescription) errors.push('Please tell us what your business does')
        if (editDescription.length < 50) errors.push('Please describe your business with more details');
        if (editDescription.length > 2000) errors.push('Please shorten your description');
        if (!editCategory) errors.push('Please choose a category')
        if (!editBusinessHours) errors.push('Please tell us your operating hours')
        // if (!(businessHours.match(operatingHours))) errors.push ('Pleast enter your operating hours in such format: 10:00 AM - 10:00 PM');
        if (!editPriceRange) errors.push('Please choose a price range for your business')
        if (!(editPhone.match(phoneNumber))) errors.push('Please enter a valid phone number')
        setValidationErrors(errors);
    }, [editName, editDescription, editCategory, editBusinessHours, editPriceRange, editPhone])

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (!validationErrors.length) {

            const payload = {
                id: business?.id,
                owner_id: user.id,
                name: editName,
                description: editDescription,
                category: editCategory,
                business_hours: editBusinessHours,
                website: editWebsite,
                price_range: editPriceRange,
                phone_number: editPhone,
                created_at: combined,
                updated_at: combined
            }
    
            const editedBusiness = await dispatch(editBusiness(payload));
            if (editedBusiness) {
                reset();
                setHasSubmitted(false);
                history.push('/');
            }
        }
    };

    const onDelete = async (id) => {
        await dispatch(deleteBusiness(id));
        history.push('/');
    };

    const reset = () => {
        setEditName('');
        setEditDescription('');
        setEditCategory('');
        setEditBusinessHours('');
        setEditWebsite('');
        setEditPriceRange('');
        setEditPhone('');
    }

    return (
        <>
            <form onSubmit={onSubmit}>
            {hasSubmitted && validationErrors.length > 0 && (
                        <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                <h2>Edit Business</h2>
                <label>Business Name</label>
                <input
                    type='text'
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                />
                <label>Description</label>
                <textarea
                    rows={'10'}
                    cols={'50'}
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                ></textarea>
                <label>Category</label>
                <select
                    value={editCategory}
                    onChange={e => setEditCategory(e.target.value)}
                >
                    {categoriesArr?.map(category => (
                        <option value={category.category_name} key={category}>{category.category_name}</option>
                    ))}
                </select>
                <label>Website</label>
                <input
                    // placeholder='Business Website(optional)'
                    type='text'
                    value={editWebsite}
                    onChange={e => e.target.value ? setEditWebsite(e.target.value): null}
                />
                <label>Business Hours</label>
                <input 
                    type='text'
                    value={editBusinessHours}
                    onChange={e => setEditBusinessHours(e.target.value)}
                />
                <label>Price Range</label>
                <select
                    value={editPriceRange}
                    onChange={e => setEditPriceRange(e.target.value)}
                >
                    {priceRangeArr.map((priceRange, idx) => (
                        <option value={priceRange} key={idx}>{priceRange}</option>
                    ))}
                </select>
                <label>Business Phone Number</label>
                <input 
                    type='text'
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                />
                <div>
                    <button type='submit'>Edit Business</button>
                </div>
                <div>
                    <button type='button' onClick={() => onDelete(business.id)}>Delete Business</button>
                </div>
            </form>
        </>
    )
};

export default EditBusinessForm;
