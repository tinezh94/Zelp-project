import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBusiness } from '../../store/business';
import { loadCategories } from '../../store/category';

const CreateBusinessForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const priceRangeArr = ['$', '$$', '$$$', '$$$$']

    const user = useSelector(state => state?.session?.user);
    const categories = useSelector(state => state?.categories);
    const businesses = useSelector(state => state?.businesses);

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
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);
    
    // useEffect(() => {
    //     const errors = [];
    // })

    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);

    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

    const phoneNumber = /^\(?([0-9]{3})\)?(\-[0-9]{3})(\-[0-9]{4})$/;

    // const operatingHours = /^\d{1,2}:\d{2}(am)?$ \-\d{1,2}:\d{2}(pm)?$/;

    useEffect(() => {
        const errors = [];

        if (!name) errors.push('Business name cannot be empty')
        if (businessesArr?.map(business => business.name).includes(name)) errors.push('Business name must be unique');
        if (!description) errors.push('Please tell us what your business does')
        if (description.length < 50) errors.push('Please describe your business with more details');
        if (!category) errors.push('Please choose a category')
        if (!businessHours) errors.push('Please tell us your operating hours')
        // if (!(businessHours.match(operatingHours))) errors.push ('Pleast enter your operating hours in such format: 10:00 AM - 10:00 PM');
        if (!priceRange) errors.push('Please choose a price range for your business')
        if (!(phone.match(phoneNumber))) errors.push('Please enter a valid phone number')
        setValidationErrors(errors);
    }, [name, description, category, businessHours, priceRange, phone])

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
                created_at: combined,
                updated_at: combined
            }
    
            const createdBusiness = await dispatch(createBusiness(payload));
            if (createdBusiness) {
                reset();
                setHasSubmitted(false);
                history.push('/');
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
    };

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
                <h2>New Business</h2>
                <label>Business Name</label>
                <input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <label>Description</label>
                <textarea
                    placeholder='Please describe your business here...'
                    rows={'10'}
                    cols={'50'}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
                <label>Category</label>
                <select
                    value={category}
                    // defaultValue={'default'}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value={'default'} disabled hidden>Please choose a category</option>
                    {categoriesArr?.map((category, idx) => (
                        <option value={category.category_name} key={idx}>{category.category_name}</option>
                    ))}
                </select>
                <label>Website</label>
                <input
                    placeholder='Business Website(optional)'
                    type='text'
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                />
                <label>Business Hours</label>
                <input 
                    placeholder='i.e 10:00 AM - 11:00 PM'
                    type='text'
                    value={businessHours}
                    onChange={e => setBusinessHours(e.target.value)}
                />
                <label>Price Range</label>
                <select
                    value={priceRange}
                    onChange={e =>  setPriceRange(e.target.value)}
                >
                    {priceRangeArr.map((priceRange, idx) => (
                        <option value={priceRange} key={idx}>{priceRange}</option>
                    ))}
                </select>
                <label>Business Phone Number</label>
                <input 
                    placeholder='123-456-7890'
                    type='text'
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <div>
                    <button type='submit'>Create Business</button>
                </div>
            </form>
        </>
    )
};

export default CreateBusinessForm;

