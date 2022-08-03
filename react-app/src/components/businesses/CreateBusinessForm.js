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

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

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

    const handleChange = e => {
        if (e.target.value) setCategory(e.target.value);
        else setCategory(categoriesArr[0]?.category_name)
    }

    return (
        <>  
            <form onSubmit={onSubmit}>
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
                    type='text'
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                />
                <label>Business Hours</label>
                <input 
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

