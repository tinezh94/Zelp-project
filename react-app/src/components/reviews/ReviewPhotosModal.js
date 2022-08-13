import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadImages, createImage, deleteImage } from "../../store/image";
import UploadReviewPhotos from './UploadReviewPhotos';

const ReviewPhotosModal = () => {
    const history = useHistory();
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

    // const fileExtensions = '([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.gif|.jpeg|.pdf)$'

    // useEffect(() => {
    //     const errors = [];
    //     if (!image?.name.match(fileExtensions)) errors.push('Please select a valid image type');
    //     if (image?.size > 1e6) errors.push('Please upload an image smaller than 1MB');
    //     setValidationErrors(errors);
    // }, [image?.name, image?.size]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setImageLoading(true);
    //     setHasSubmitted(true);
        
    //     if (!validationErrors.length) {
    //         const payload = {
    //             user_id: user.id,
    //             business_id: Number(businessId),
    //             image_url: image
    //         }
    //         const uploadedImage = await dispatch(createImage(payload));
    //         console.log('uploadedimage', uploadedImage)
    //         if (uploadedImage) {
    //             reset();
    //             setHasSubmitted(false);
    //             setImageLoading(false);
    //             setValidationErrors([]);
    //             hideForm();
    //         }
    //     }
    // }

    // const updateImage = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    // }

    // // console.log('image', image, image?.name, image?.size)
    // const reset = () => {
    //     setImage(null);
    // }

    const hideForm = () => {
        setShowModal(false);
    }

    const displayComp = () => {
        const container = document.getElementById('review-add-photos-containers');
        console.log('container', container)
        if (bizImages.length > 0 && container) container.style.width = '100px';
    }

    // const changeContent = () => {
    //     const selectPhotos = document.getElementById('select-photos');
    //     const photoIllustration = document.getElementById('drop-photos')

    //     if (image && selectPhotos && photoIllustration) {
    //         selectPhotos.style.display = 'none';
    //         photoIllustration.style.display = 'none';
    //         return (
    //             <div>
    //                 <img 
    //                     className='image-preview'
    //                     src={URL.createObjectURL(image)}
    //                     alt='image-preview'
    //                 />
    //             </div>
    //         )
    //     }
    // }

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