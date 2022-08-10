import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AddProfilePic } from '../../store/session';
import { Modal } from '../../context/Modal';

const ProfileImage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    const user = useSelector(state => state?.session?.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setImageLoading(true);
        setHasSubmitted(true);

        const user = {
            profile_pic: image
        };

        const addedProfilePic = await dispatch(AddProfilePic(user));
        console.log('profile', addedProfilePic)
        if (addedProfilePic) {
            reset();
            setHasSubmitted(false);
            setImageLoading(false);
            hideForm();
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const reset = () => {
        setImage(null);
    }

    const hideForm = () => {
        setShowModal(false);
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)} className='add-profile-pic-btn'>
                <i className="fa-solid fa-images"></i>
                <p className='add-profile-pic-p'>Add Profile Photos</p>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='add-photos-modal'>
                        <form onSubmit={handleSubmit}>
                            {/* {hasSubmitted && validationErrors.length > 0 (
                                <ul>
                                    {validationErrors.map(error => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            )} */}
                            <div className='attach-photos-container'>
                                <img className='drop-photos' src='https://s3-media0.fl.yelpcdn.com/assets/public/photo_review_325x200_v2.yji-4a099f5381e9ea0301bb.svg' alt='add-photos' />
                                <h2 className='select-your-photos'>Select your photos here</h2>
                                <input 
                                    className='choose-file-btn'
                                    type='file'
                                    accept='image/*'
                                    onChange={updateImage}
                                />
                            </div>
                            <div className='cancel-submit-pic-div'>
                                <button className='cancel-upload-image-btn' type='button' onClick={() => setShowModal(false)}>Cancel</button>
                                <button className='upload-image-btn' type='submit'>Attach</button>
                            </div>
                            {imageLoading && <p className='loading-pic'>Loading ...</p>}
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default ProfileImage;
