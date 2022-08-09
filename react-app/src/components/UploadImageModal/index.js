import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import UploadPicture from '../images/UploadImage';
import { createImage } from "../../store/image";

function UploadImageModal() {
    const history = useHistory();
    const { businessId } = useParams();
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const hadnleClose = () => setShowModal(false);

    const user = useSelector(state => state?.session?.user);

    const imageTypes = '/\.(jpg|jpeg|png|gif)$/';
    const MaxFileSize = 1024 * 1024;

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
                hideForm();
            }
        }


    }
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    console.log('image', image, image?.name, image?.size)
    const reset = () => {
        setImage(null);
    }

    const hideForm = () => {
        setShowModal(false);
    }
    
    return (
        <div>
            <div className='add-photos-icon-container'>
                <button className='add-photo-btn' onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                        <div className='add-photos-modal'>
                            <form onSubmit={handleSubmit}>
                                {hasSubmitted && validationErrors.length > 0 && (
                                    <ul>
                                        {validationErrors.map(error => (
                                            <li key={error}>{error}</li>
                                        ))}
                                    </ul>
                                )}
                                <div className='attach-photos-container'>
                                    <img className='drop-photos' src='https://s3-media0.fl.yelpcdn.com/assets/public/photo_review_325x200_v2.yji-4a099f5381e9ea0301bb.svg' alt='add-photos' />
                                    <h2 className='select-your-photos'>Select your photos here</h2>
                                    <input
                                        className='choose-file-btn'
                                        type="file"
                                        accept="image/*"
                                        onChange={updateImage}
                                    />
                                </div>
                                <div className='cancel-submit-pic-div'>
                                    <button className='cancel-upload-image-btn' type='button' onClick={() => setShowModal(false)}>Cancel</button>
                                    <button className='upload-image-btn' type='submit'>Attach</button>
                                </div>
                                {!validationErrors.length && imageLoading && <p>Loading ...</p>}
                            </form>
                        </div>
                    </Modal>
            )}
        </div>
    )
};

export default UploadImageModal;
