import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import AllImages from '../images/AllImages';
import UploadImageModal from '../UploadImageModal';
import { createImage } from '../../store/image';

const BizUploadImage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();

    const user = useSelector(state => state?.session?.user);

    const [ image, setImage ] = useState(null);
    const [ imageLoading, setImageLoading ] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        // if (!image?.name.includes(imageTypes)) errors.push('Please select a valid image');
        if (image?.size > 1e6) errors.push('Please upload an image smaller than 1MB');
        setValidationErrors(errors);
    }, [image?.name, image?.size]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        setHasSubmitted(true);
        
        if (!validationErrors.length) {
            const payload = {
                user_id: user.id,
                business_id: Number(businessId),
                image_url: image
            }
            const uploadedImage = await dispatch(createImage(payload));
            console.log('uploadedimage', uploadedImage)
            if (uploadedImage) {
                reset();
                setHasSubmitted(false);
                setImageLoading(false);
                history.push(`/businesses/${businessId}`);
            }
        }
    
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        // setImage(URL.createObjectURL(file));
        setImage(file);
    }

    console.log('image', image, image?.name, image?.size)
    const reset = () => {
        setImage(null);
    }

    // const hideForm = () => {
    //     setShowModal(false);
    // }
    return (
        <>
            <div className='image-upload-container'>
                <h1 className='image-upload-h1'>Photos</h1>
                <p className='image-upload-p'>Photos are essential to presenting your business on Yelp. To help customers learn about and choose your business, upload multiple photos to look your best.</p>
                <div className='upload-manage-div'>
                    <img src='https://s3-media0.fl.yelpcdn.com/assets/public/40x40_add_photos_v2.yji-b3ffe3d530062cb147cb.svg' alt='upload-image' style={{width: 40, height: 40}} />
                    <h3 className='image-upload-h3'>Upload and manage photos</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <div className='image-upload-div'>
                        <div className='add-your-photos'>Add your photo below</div>
                            <div className='choose-file-container'>
                                <input
                                    className='choose-file-btn'
                                    id='choose-file-btn'
                                    type="file"
                                    accept="image/*"
                                    onChange={updateImage}
                                />
                                {image && (
                                    <div>
                                        <img 
                                            className='image-preview'
                                            src={URL.createObjectURL(image)}
                                            alt='image-preview'
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    <div className='upload-image-save-div'>
                        <button className='upload-image-save-btn' type='submit'>Save & continue <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
};

export default BizUploadImage;