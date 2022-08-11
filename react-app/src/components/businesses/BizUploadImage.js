import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import AllImages from '../images/AllImages';
import UploadImageModal from '../UploadImageModal';
import { createImage, loadImages, deleteImage } from '../../store/image';
import { Modal } from '../../context/Modal';

const BizUploadImage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();
    
    const user = useSelector(state => state?.session.user);
    const images = useSelector(state => state?.images);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const bizImages = Object.values(images)?.filter(image => {
        return (image.business_id === Number(businessId) && image.user_id === user.id);
    });

    const bizTotalImages = Object.values(images)?.filter(image => {
        return (image.business_id === Number(businessId));
    })

    console.log('biz', bizTotalImages)


    useEffect(() => {
        dispatch(loadImages());
    },[dispatch, businessId]);

    useEffect(() => {
        const errors = [];
        if (bizTotalImages.length < 5) errors.push('Business owner must upload at least 5 photos.');
        setValidationErrors(errors);
    }, [dispatch, bizImages?.length])

    const onSave = (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (!validationErrors.length) {
            setHasSubmitted(false);
            setValidationErrors([]);
            history.push(`/businesses/${businessId}`);
        }
    }

    const onDeletePic = async (id) => {
        await dispatch(deleteImage(id));
    }

    return (
        <>
            <div className='image-upload-container'>
                <h1 className='image-upload-h1'>Photos</h1>
                <p className='image-upload-p'>Photos are essential to presenting your business on Yelp. To help customers learn about and choose your business, upload multiple photos to look your best.</p>
                <div className='upload-manage-div'>
                    <img src='https://s3-media0.fl.yelpcdn.com/assets/public/40x40_add_photos_v2.yji-b3ffe3d530062cb147cb.svg' alt='upload-image' style={{width: 40, height: 40}} />
                    <h3 className='image-upload-h3'>Upload and manage photos</h3>
                </div>
                <div className='image-upload-div'>
                    <div className='add-your-photos'>Add your photo below</div>
                        <div className='uploadpg-view-add-div'>
                            <div className='upload-pg-errors-div'>
                                {hasSubmitted && validationErrors.length > 0 && (
                                    <ul>
                                        {validationErrors.map(error => (
                                            <li key={error}>{error}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <UploadImageModal />
                            <div className='uploadpg-imgs-div'>
                                {bizImages.map(image => (
                                    <div className='uploadpg-img-delete-div'>
                                        <img className='upload-pg-img' src={image.image_url} />
                                        <button className='uploadpg-delete-pic-btn' type='button' onClick={() => onDeletePic(image.id)}>
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* {image && (
                            <div>
                                <img 
                                    className='image-preview'
                                    src={URL.createObjectURL(image)}
                                    alt='image-preview'
                                />
                            </div>
                        )} */}
                        {/* <div className='choose-file-container'>
                            <input
                                className='choose-file-btn'
                                id='choose-file-btn'
                                type="file"
                                accept="image/*"
                                onChange={updateImage}
                            />
                        </div> */}
                    </div>
                    <div className='upload-image-save-div'>
                        <button className='upload-image-save-btn' type='submit' onClick={onSave}>Save & continue <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                {/* </form> */}
            </div>
        </>
    )
};

export default BizUploadImage;