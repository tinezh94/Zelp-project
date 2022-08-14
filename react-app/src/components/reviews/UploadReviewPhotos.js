import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadImages, createImage, deleteImage } from "../../store/image";

const UploadReviewPhotos = ({ setShowModal, showModal }) => {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const user = useSelector(state => state?.session?.user);
        const images = useSelector(state => state?.images);

    const bizImages = Object.values(images)?.filter(image => {
        return (image.business_id === Number(businessId) && image.user_id === user.id);
    });

    useEffect(() => {
        dispatch(loadImages());
    },[dispatch, businessId]);

    const fileExtensions = '([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.gif|.jpeg|.pdf)$'

    useEffect(() => {
        const errors = [];
        if (!image?.name.match(fileExtensions)) errors.push('Please select a valid image type');
        if (image?.size > 1e6) errors.push('Please upload an image smaller than 1MB');
        setValidationErrors(errors);
    }, [image?.name, image?.size]);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                setValidationErrors([]);
                hideForm();
            }
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    // console.log('image', image, image?.name, image?.size)
    const reset = () => {
        setImage(null);
    }

    const hideForm = () => {
        setShowModal(false);
    }

    const changeContent = () => {
        const selectPhotos = document.getElementById('select-photos');
        const photoIllustration = document.getElementById('drop-photos')

        if (image && selectPhotos && photoIllustration) {
            selectPhotos.style.display = 'none';
            photoIllustration.style.display = 'none';
            return (
                <div>
                    <img 
                        className='image-preview'
                        src={URL.createObjectURL(image)}
                        alt='image-preview'
                    />
                </div>
            )
        }
    }

    const submit = (e) => {
        const btn = document.getElementById('upload-img-btn');
        btn.addEventListener('click', handleSubmit(e));
    }

    return (
        <div className='add-photos-modal'>
            <form onSubmit={handleSubmit}>
                <div className='biz-img-upload-errors-div'>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='attach-photos-container'>
                    <img className='drop-photos' id='drop-photos' src='https://s3-media0.fl.yelpcdn.com/assets/public/photo_review_325x200_v2.yji-4a099f5381e9ea0301bb.svg' alt='add-photos' />
                    <h2 className='select-your-photos' id='select-photos'>Select your photos here</h2>
                    <div className='drop-photos-modal-preview-div'>
                        {changeContent()}
                        <input
                            className='choose-file-btn'
                            type="file"
                            accept="image/*"
                            onChange={updateImage}
                        />
                    </div>
                </div>
                <div className='cancel-submit-pic-div'>
                    <button className='cancel-upload-image-btn' type='button' onClick={() => setShowModal(false)}>Cancel</button>
                    <button className='upload-image-btn' type='button' id='upload-img-btn' onClick={submit}>Attach</button>
                </div>
                {!validationErrors.length && imageLoading && <p className='loading-pic'>Loading ...</p>}
            </form>
        </div>
    )
}

export default UploadReviewPhotos;