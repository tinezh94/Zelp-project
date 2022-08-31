import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId, geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

import { createBusiness } from '../../store/business';
import { loadCategories } from '../../store/category';

const CreateBusinessForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const priceRangeArr = ['$', '$$', '$$$', '$$$$']

    const user = useSelector(state => state?.session?.user);
    const categories = useSelector(state => state?.categories);
    const businesses = useSelector(state => state?.businesses);
    const apiKey = useSelector(state => state?.key);

    const businessesArr = businesses ? Object.values(businesses) : null;


    // console.log('frontent', categories);

    const categoriesArr = categories ? Object.values(categories) : null;
    // console.log('frontend array', categoriesArr)

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ category, setCategory ] = useState('default');
    const [ businessHours, setBusinessHours ] = useState('');
    const [ website, setWebsite ] = useState('');
    const [ priceRange, setPriceRange ] = useState(priceRangeArr[0]);
    const [ phone, setPhone ] = useState('');
    const [ streetAddress, setStreetAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ zipcode, setZipcode ] = useState('');
    const [ latitude, setLatitude ] = useState('');
    const [ longitude, setLongitude ] = useState('');
    const [ autoValue, setAutoValue ] = useState(null);
    const [ address, setAddress ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);
    

    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);

    let placeId = autoValue ? autoValue.value.place_id : null;

    if (placeId) {
        geocodeByPlaceId(placeId)
        .then(result => {
            setAddress(result[0].formatted_address);
            setStreetAddress(address.split(',')[0]);
            setCity(address.split(', ')[1]);
            let stateZip = address.split(', ')[2];
            setState(stateZip.split(' ')[0]);
            setZipcode(stateZip.split(' ')[1]);
        })
        .catch(error => console.error(error));
    }

    
    if (address.length > 0) {
        geocodeByAddress(address)
            .then(res => getLatLng(res[0]))
            .then(({lat, lng}) => {
                setLatitude(lat);
                setLongitude(lng);
            })
            .catch(error => console.error(error));    
    }

    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

    const phoneNumber = /^\(?([0-9]{3})\)?(\-[0-9]{3})(\-[0-9]{4})$/;
    const operatingHours = /^(0?[1-9]|1[0-2]):([0-5]\d)\s((?:A|P)\.?M\.?)\s([\-])\s(0?[1-9]|1[0-2]):([0-5]\d)\s((?:A|P)\.?M\.?)$/i;
    const validZip = /^\d{5}$/;
    
    // console.log(businessHours?.split('-')[1].split(':')[0])
    const morning = businessHours?.split(' - ')[0]?.split(' ')[1];
    const afternoon = businessHours?.split(' - ')[1]?.split(' ')[1];
    const openingHour = parseInt(businessHours?.split(' - ')[0]?.split(':')[0]);
    const closingHour = parseInt(businessHours?.split(' - ')[1]?.split(':')[0]);
    
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


    useEffect(() => {
        const errors = [];

        if (!name) errors.push('Business name cannot be empty')
        if (name.length > 100) errors.push('Business name cannot exceed 100 characters');
        if (businessesArr?.map(business => business.name).includes(name)) errors.push('Business name must be unique');
        if (!address) errors.push('Business address cannot be empty');
        // if (!streetAddress) errors.push(' cannot be empty');
        if (!city) errors.push('City field cannot be empty')
        if (!state) errors.push('State field cannot be empty')
        if (!zipcode) errors.push('Zipcode field cannot be empty')
        if (!(zipcode?.match(validZip))) errors.push('Zipcode must be in valid format. ie. 12345')
        if (!description) errors.push('Please tell us what your business does')
        if (description.length < 50) errors.push('Please describe your business with more details');
        if (description.length > 1000) errors.push('Please shorten your description');
        if (category === 'Please choose a category') errors.push('Please choose a category')
        if (!businessHours) errors.push('Please tell us your operating hours')
        if (!businessHours?.match(operatingHours)) errors.push('Please have your business hours in valid format: ie. 10:00 AM - 11:00 PM');
        if (!validateOperation()) errors.push('Please enter valid operating hours');
        // if (!(businessHours.match(operatingHours))) errors.push ('Pleast enter your operating hours in such format: 10:00 AM - 10:00 PM');
        if (!priceRange) errors.push('Please choose a price range for your business')
        if (!(phone?.match(phoneNumber))) errors.push('Please enter a valid phone number, i.g 012-333-4567')
        setValidationErrors(errors);
    }, [name, description, category, businessHours, priceRange, phone, address, streetAddress, city, state, zipcode])

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (!validationErrors.length) {
            const payload = {
                owner_id: user.id,
                name: name,
                description: description,
                category: category,
                business_hours: businessHours,
                website: website,
                price_range: priceRange,
                phone_number: phone,
                address: streetAddress,
                city: city,
                state: state,
                zipcode: zipcode,
                longitude: longitude,
                latitude: latitude,
                created_at: combined,
                updated_at: combined
            }
    
            const createdBusiness = await dispatch(createBusiness(payload));
            if (createdBusiness) {
                reset();
                setHasSubmitted(false);
                history.push(`/biz_user_photos/${createdBusiness.id}/upload`);
            };
        }
    };

    const reset = () => {
        setName('');
        setDescription('');
        setCategory('');
        setBusinessHours('');
        setWebsite('');
        setPriceRange('');
        setPhone('');
        setStreetAddress('');
        setCity('');
        setState('');
        setZipcode('');
        setLongitude('');
        setLatitude('');
    };

    return (
        <>  
            <form onSubmit={onSubmit} className='create-biz-form'>
                <div className='create-biz-errors-div'>
                    {hasSubmitted && validationErrors.length > 0 && (
                            <ul className='create-biz-error'>
                                {validationErrors.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        )}
                </div>
                <div className='create-biz-single-sec'>
                    <h2 className='create-biz-h2'>Add your listing to Zelp!</h2>
                    <div className='create-biz-h5-div'>
                        <h5 className='create-biz-h2-sub'>Fields with * are required!</h5>
                        <h5 className='us-address-only' >US Addresses ONLY!</h5>
                    </div>
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Business Name*</label>
                    <input
                        className='create-biz-input'
                        placeholder='Your business name here...'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Address*</label>
                    <div>
                        {apiKey && 
                        <GooglePlacesAutocomplete
                            apiKey={apiKey}
                            selectProps={{
                                styles: {
                                    input: (provided) => ({
                                    ...provided,
                                    color: '#2d2e2f',
                                    }),
                                    option: (provided) => ({
                                    ...provided,
                                    color: '#2d2e2f',
                                    }),
                                    singleValue: (provided) => ({
                                    ...provided,
                                    color: '#2d2e2f',
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
                        value={streetAddress}
                        onChange={e => setStreetAddress(e.target.value)} 
                    />
                </div>
                <div className='create-biz-city-state-div'>
                    <div className='create-biz-city-div'>
                        <label className='create-biz-label'>City*</label>
                        <input
                            className='create-biz-input'
                            type='text'
                            value={city}
                            onChange={e => setCity(e.target.value)} 
                        />
                    </div>
                    <div className='create-biz-state-div'>
                        <label className='create-biz-label'>State*</label>
                        <input
                            className='create-biz-input'
                            type='text'
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                    </div>
                </div>
                <div className='create-biz-zipcode-div'>
                    <label className='create-biz-label'>Zip Code*</label>
                    <input 
                        className='create-biz-zipcode-input'
                        type='text'
                        value={zipcode}
                        onChange={e => setZipcode(e.target.value)}
                    />
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Description*</label>
                    <textarea
                        className='create-biz-text'
                        placeholder='Please describe your business here...'
                        rows={'12'}
                        cols={'50'}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Category*</label>
                    <select
                        className='create-biz-select'
                        value={category}
                        // defaultValue={'default'}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value={'default'} disabled hidden>Please choose a category</option>
                        {categoriesArr?.map((category, idx) => (
                            <option value={category.category_name} key={idx}>{category.category_name}</option>
                        ))}
                    </select>
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Website</label>
                    <input
                        className='create-biz-input'
                        placeholder='Business website (optional)'
                        type='text'
                        value={website}
                        onChange={e => setWebsite(e.target.value)}
                    />
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Business Hours*</label>
                    <input 
                        className='create-biz-input'
                        placeholder='i.g 10:00 AM - 11:00 PM'
                        type='text'
                        value={businessHours}
                        onChange={e => setBusinessHours(e.target.value)}
                    />
                </div>
                <div className='create-biz-single-sec'>
                    <label className='create-biz-label'>Price Range*</label>
                    <select
                        className='create-biz-select'
                        value={priceRange}
                        onChange={e =>  setPriceRange(e.target.value)}
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
                        placeholder='123-456-7890'
                        type='text'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div className='create-biz-btns-div'>
                    <NavLink to='/'>
                        <button className='create-biz-cancel-btn'>Cancel</button>
                    </NavLink>
                    <button className='create-biz-submit-btn' type='submit'>Create Business</button>
                </div>
            </form>
        </>
    )
};

export default CreateBusinessForm;

