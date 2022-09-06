import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId, geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


import { deleteBusiness, editBusiness, loadBusinesses } from '../../store/business';
import { loadCategories } from '../../store/category';
import DeleteBizModal from './DeleteBusinessModal';

const EditBusinessForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();

    const priceRangeArr = ['$', '$$', '$$$', '$$$$']

    const user = useSelector(state => state?.session?.user);
    const categories = useSelector(state => state?.categories);
    const businesses = useSelector(state => state?.businesses);
    const apiKey = useSelector(state => state?.key);
    // console.log("edit business")
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
    const [ editStreetAddress, setEditStreetAddress ] = useState(business?.address);
    const [ editCity, setEditCity ] = useState(business?.city);
    const [ editState, setEditState ] = useState(business?.state);
    const [ editZipcode, setEditZipcode ] = useState(business?.zipcode);
    const [ editLatitude, setEditLatitude ] = useState(business?.latitude);
    const [ ediLongitude, setEditLongitude ] = useState(business?.longitude);
    const [ autoValue, setAutoValue ] = useState(null);
    const [ address, setAddress ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    let placeId = autoValue ? autoValue.value.place_id : null;

    if (placeId) {
        geocodeByPlaceId(placeId)
        .then(result => {
            setAddress(result[0].formatted_address);
            setEditStreetAddress(address.split(',')[0]);
            setEditCity(address.split(', ')[1]);
            let stateZip = address.split(', ')[2];
            setEditState(stateZip.split(' ')[0]);
            setEditZipcode(stateZip.split(' ')[1]);
        })
        .catch(error => console.error(error));
    }

    if (address?.length > 0) {
        geocodeByAddress(address)
            .then(res => getLatLng(res[0]))
            .then(({lat, lng}) => {
                setEditLatitude(lat);
                setEditLongitude(lng);
            })
            .catch(error => console.error(error));    
    }

    // useEffect(() => {
    //     setEditStreetAddress(editStreetAddress);
    //     setEditCity(editCity);
    //     setEditState(editState);
    //     setEditZipcode(editZipcode);
    // }, [editStreetAddress, editCity, editState, editZipcode])

    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

    const phoneNumber = /^\(?([0-9]{3})\)?(\-[0-9]{3})(\-[0-9]{4})$/;
    const operatingHours = /^(0?[1-9]|1[0-2]):([0-5]\d)\s((?:A|P)\.?M\.?)\s([\-])\s(0?[1-9]|1[0-2]):([0-5]\d)\s((?:A|P)\.?M\.?)$/i;
    const validZip = /^\d{5}$/;
    
        // console.log(editBusinessHours?.split(' - ')[1].split(' ')[1])
    const morning = editBusinessHours?.split(' - ')[0]?.split(' ')[1];
    const afternoon = editBusinessHours?.split(' - ')[1]?.split(' ')[1];
    const openingHour = parseInt(editBusinessHours?.split(' - ')[0]?.split(':')[0]);
    const closingHour = parseInt(editBusinessHours?.split(' - ')[1]?.split(':')[0]);
    
    const validateOperation = () => {
        if (morning === 'am' || morning === 'AM') {
            if (openingHour > closingHour || openingHour <= closingHour) return true;
        }
        else if ((morning === 'pm' || morning === 'PM') && (afternoon === 'am' || afternoon === 'AM')) {
            console.log('inside if statement', openingHour > closingHour)
            if (openingHour > closingHour && closingHour <= '5') return true;
            if (openingHour < closingHour) return true;
        }
        else if ((morning === 'pm' || morning === 'PM') && (afternoon === 'pm' || afternoon === 'PM')) {
            if (openingHour < '12' && openingHour > closingHour && closingHour >= '10') return true;
            if (openingHour == '12' && openingHour > closingHour) return true;
        }
        return false;
    }

    // console.log(validateOperation())
    console.log('biz add', business?.address)
    console.log('street add', editStreetAddress)
    console.log('city', editCity)




    
    useEffect(() => {
        const errors = [];

        if (!editName) errors.push('Business name cannot be empty')
        if (editName.length > 45) errors.push('Business name is too long');
        // if (businessesArr?.map(business => business.name).includes(editName)) errors.push('Business name must be unique');
        // if (!address) errors.push('Business address cannot be empty');
        if (!editStreetAddress) errors.push('Business address cannot be empty');
        if (!editCity) errors.push('City field cannot be empty')
        if (!editState) errors.push('State field cannot be empty')
        if (!editZipcode) errors.push('Zipcode field cannot be empty')
        if (!(editZipcode?.match(validZip))) errors.push('Zipcode must be in valid format. ie. 12345')
        if (!editDescription) errors.push('Please tell us what your business does')
        if (editDescription?.length < 50) errors.push('Please describe your business with more details');
        if (editDescription?.length > 1000) errors.push('Please shorten your description');
        if (!editCategory) errors.push('Please choose a category')
        if (!editBusinessHours) errors.push('Please tell us your operating hours')
        if (!editBusinessHours?.match(operatingHours)) errors.push('Please have your business hours in valid format: ie. 10:00 AM - 11:00 PM');
        if (!validateOperation()) errors.push('Please enter valid operating hours');
        // if (!(businessHours.match(operatingHours))) errors.push ('Pleast enter your operating hours in such format: 10:00 AM - 10:00 PM');
        if (!editPriceRange) errors.push('Please choose a price range for your business')
        if (!(editPhone?.match(phoneNumber))) errors.push('Please enter a valid phone number, i.g 012-333-4567')
        setValidationErrors(errors);
    }, [editName, editDescription, editCategory, editBusinessHours, editPriceRange, editPhone, editStreetAddress, editCity, editState, editZipcode])

    console.log('errors', validationErrors)

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
                address: editStreetAddress,
                city: editCity,
                state: editState,
                zipcode: editZipcode,
                latitude: editLatitude,
                longitude: ediLongitude,
                created_at: combined,
                updated_at: combined
            }
    
            const editedBusiness = await dispatch(editBusiness(payload));
            if (editedBusiness) {
                reset();
                setHasSubmitted(false);
                history.push(`/businesses/${business.id}`);
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
        setEditStreetAddress('');
        setEditCity('');
        setEditState('');
        setEditZipcode('');
        setEditLatitude('');
        setEditLongitude('');
    }

    return (
        <>
            <form onSubmit={onSubmit} className='create-biz-form'>
                <div className='create-biz-errors-div'>
                    {/* <div className='create-biz-errors-div'> */}
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul className='create-biz-error'>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                    {/* </div> */}
                </div>
                <div className='create-biz-single-sec'> 
                    <h2 className='create-biz-h2'>{business?.name}</h2>
                    <div className='create-biz-h5-div'>
                        <h5 className='create-biz-h2-sub'>Fields with * are required!</h5>
                        <h5 className='us-address-only' >US Addresses ONLY!</h5>
                    </div>
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Business Name*</label>
                    <input
                        className='create-biz-input'
                        type='text'
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                    />
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Address</label>
                    <div>
                        {apiKey && 
                        <GooglePlacesAutocomplete
                            apiKey={apiKey}
                            selectProps={{
                                styles: {
                                    input: (provided) => ({
                                    ...provided,
                                    color: 'blue',
                                    }),
                                    option: (provided) => ({
                                    ...provided,
                                    color: 'blue',
                                    }),
                                    singleValue: (provided) => ({
                                    ...provided,
                                    color: 'blue',
                                    }),
                                },
                                value: autoValue,
                                onChange: setAutoValue
                            }}
                        />
                        }
                    </div>
                </div>
                <div className='create-biz-address-div'>
                    <label className='create-biz-label'>Address*</label>
                    <input
                        className='create-biz-address-input'
                        type='text'
                        value={editStreetAddress}
                        onChange={e => setEditStreetAddress(e.target.value)} 
                    />
                </div>
                <div className='create-biz-city-state-div'>
                    <div className='create-biz-city-div'>
                        <label className='create-biz-label'>City*</label>
                        <input
                            className='create-biz-input'
                            type='text'
                            value={editCity}
                            onChange={e => setEditCity(e.target.value)} 
                        />
                    </div>
                    <div className='create-biz-state-div'>
                        <label className='create-biz-label'>State*</label>
                        <input
                            className='create-biz-input'
                            type='text'
                            value={editState}
                            onChange={e => setEditState(e.target.value)}
                        />
                    </div>
                </div>
                <div className='create-biz-zipcode-div'>
                    <label className='create-biz-label'>Zip Code*</label>
                    <input 
                        className='create-biz-zipcode-input'
                        type='text'
                        value={editZipcode}
                        onChange={e => setEditZipcode(e.target.value)}
                    />
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Description*</label>
                    <textarea
                        className='create-biz-text'
                        rows={'12'}
                        cols={'50'}
                        value={editDescription}
                        onChange={e => setEditDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Category*</label>
                    <select
                        className='create-biz-select'
                        value={editCategory}
                        onChange={e => setEditCategory(e.target.value)}
                    >
                        {categoriesArr?.map(category => (
                            <option value={category.category_name} key={category}>{category.category_name}</option>
                        ))}
                    </select>
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Website</label>
                    <input
                        className='create-biz-input'
                        // placeholder='Business Website(optional)'
                        type='text'
                        value={editWebsite}
                        onChange={e => e.target.value ? setEditWebsite(e.target.value): null}
                    />
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Business Hours (i.e 10:00 AM - 11:00 PM)*</label>
                    <input 
                        className='create-biz-input'
                        type='text'
                        value={editBusinessHours}
                        onChange={e => setEditBusinessHours(e.target.value)}
                    />
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Price Range*</label>
                    <select
                        className='create-biz-select'
                        value={editPriceRange}
                        onChange={e => setEditPriceRange(e.target.value)}
                    >
                        {priceRangeArr.map((priceRange, idx) => (
                            <option value={priceRange} key={idx}>{priceRange}</option>
                        ))}
                    </select>
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Business Phone Number*</label>
                    <input 
                        className='create-biz-input'
                        type='text'
                        value={editPhone}
                        onChange={e => setEditPhone(e.target.value)}
                    />
                </div>
                <div className='edit-biz-btns-div'>
                    <button className='edit-biz-submit-btn' type='submit'>Edit Business</button>
                    <button className="edit-biz-delete-btn" type='button' onClick={() => onDelete(business.id)}>Remove Business</button>
                    {/* <DeleteBizModal business={business} /> */}
                </div>
            </form>
        </>
    )
};

export default EditBusinessForm;
