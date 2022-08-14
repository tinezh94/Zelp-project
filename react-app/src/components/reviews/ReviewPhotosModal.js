import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadImages, createImage, deleteImage } from "../../store/image";
import UploadReviewPhotos from './UploadReviewPhotos';

const ReviewPhotosModal = () => {
    const { businessId } = useParams();
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const user = useSelector(state => state?.session?.user);
    const images = useSelector(state => state?.images);

    const bizImages = Object.values(images)?.filter(image => {
        return (image.business_id === Number(businessId) && image.user_id === user.id);
    });

    useEffect(() => {
        dispatch(loadImages());
    },[dispatch, businessId]);

    const hideForm = () => {
        setShowModal(false);
    }

    const displayComp = () => {
        const container = document.getElementById('review-add-photos-containers');
        console.log('container', container)
        if (bizImages.length > 0 && container) container.style.width = '100px';
    }

    return (
        <div>
            <div className='add-photos-icon-container' id='review-add-photos-containers'>
                {bizImages && displayComp()}
                <button className='add-photo-btn'  type='button' onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UploadReviewPhotos hideForm={hideForm} showModal={showModal} setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    )
}

export default ReviewPhotosModal;