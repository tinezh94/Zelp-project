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
            // setImageLoading(false);
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
            <button onClick={() => setShowModal(true)}>Add Profile Picture Here</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit}>
                        {/* {hasSubmitted && validationErrors.length > 0 (
                            <ul>
                                {validationErrors.map(error => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        )} */}
                        <input 
                            type='file'
                            accept='image/*'
                            onChange={updateImage}
                        />
                        <button type='submit'>Submit</button>
                        {imageLoading && <p>Loading ...</p>}
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default ProfileImage;
