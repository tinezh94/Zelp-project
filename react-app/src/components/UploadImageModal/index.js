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
        <>
            <button onClick={() => setShowModal(true)}>Upload Images Here</button>
            {showModal && (
                <Modal>
                    <form onSubmit={handleSubmit}>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                     )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={updateImage}
                        />
                        <button type='submit'>Submit</button>
                        {!validationErrors.length && imageLoading && <p>Loading ...</p>}
                    </form>
                </Modal>
            )}
        </>
    )
};

export default UploadImageModal;
