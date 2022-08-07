import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
// import { loadOneBusiness } from '../../store/business';
import { deleteImage, loadImages } from '../../store/image';

import { deleteReview, editReview } from '../../store/review';
// import EditImage from '../images/EditImage';
// import UploadPicture from '../images/UploadImage';
import UploadImageModal from '../UploadImageModal';
import './reviews.css'

const EditReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { businessId } = useParams();

    const user = useSelector(state => state?.session?.user);
    const reviews = useSelector(state => state?.reviews)
    const images = useSelector(state => state?.images);
    const businesses = useSelector(state => state?.businesses);
    const businessesArr = businesses ? Object.values(businesses) : null;
    let business = businessesArr?.filter(business => {
        return business?.id === Number(businessId)
    });

    business = business[0];
    const bizImagesArr = images ? Object.values(images) : null;

    const bizImages = bizImagesArr?.filter(image => {
        return image.business_id === Number(businessId);
    });

    // console.log('Edit review form', bizImages)

    let review = Object.values(reviews)?.filter(review => {
        return (review?.business_id === Number(businessId) && review?.user_id === user.id);
    })
    
    review = review[0];

    const colors = {
        'orange': "#f15c00",
        'grey': "#a9a9a9"
    }

    const stars = Array(5).fill(0);

    const [ editRating, setEditRating ] = useState(review?.rating);
    const [ hoverValue, setHoverValue ] = useState(undefined);

    const [ editContent, setEditContent ] = useState(review?.review_content);
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    useEffect(() => {
        dispatch(loadImages());
    }, [dispatch]);

    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

    useEffect(() => {
        const errors = [];
        if (!editRating) errors.push('Please leave a rating');
        if (editContent?.length < 30) errors.push('Woah, did you mean to post so soon? We thought your review was just getting started! Please add more details so we can post this review.');
        setValidationErrors(errors);
    }, [editRating, editContent]);

    const handleClick = value => {
        setEditRating(value)
    };

    const handleMouseOver = value => {
        setHoverValue(value)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (!validationErrors.length) {
            const payload = {
                id: review?.id,
                user_id: user.id,
                business_id: review?.business_id,
                rating: editRating,
                review_content: editContent,
                created_at: combined,
                updated_at: combined
            }
    
            const editedReview = await dispatch(editReview(payload))
            if (editedReview) {
                reset();
                setHasSubmitted(false);
                history.push(`/businesses/${businessId}`);
            }
        }
    }

    const onDeletePic = async (id) => {
        await dispatch(deleteImage(id));
        history.push(`/businesses/${businessId}`);
    }

    const reset = () => {
        setEditRating('');
        setEditContent('')
    }

    return (
        <>
            <form onSubmit={onSubmit}>
            {hasSubmitted && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <h2>{business?.name}</h2>
                {/* <label>Rating</label>
                <input 
                    type='text'
                    value={editRating}
                    onChange={e => setEditRating(e.target.value)}
                /> */}
                <div style={styles.container}>
                    <div style={styles.stars}>
                        {stars.map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label>
                                    <input 
                                        type='radio' 
                                        display='none'
                                        name='rating' 
                                        value={ratingValue}
                                        onClick={() => setEditRating(ratingValue )} />
                                    <FaStar 
                                        key={index}
                                        size={50}
                                        style={{
                                            marginRight: 10,
                                            cursor: 'pointer'
                                        }}
                                        color={ratingValue <= (editRating || hoverValue) ? colors.orange : colors.grey}
                                        // onClick={() => handleClick(index + 1)}
                                        onMouseEnter={() => handleMouseOver(ratingValue)}
                                        onMouseLeave={handleMouseLeave}
                                        ></FaStar>
                                </label>
                            )
                        })}
                    </div>
                </div>
                <textarea
                    rows={'10'}
                    cols={'50'}
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                ></textarea>
                {bizImages && bizImages.map (image => (
                    <div>
                        <img src={image['image_url']} alt='biz review photos' style={{width: 500, height: 350 }} />
                        <button type='button' onClick={() => onDeletePic(image.id)}>Delete Image</button>
                    </div>
                ))}
                <div>
                    <button type='submit'>Edit Review</button>
                </div>
                {/* <div>
                    <button type='button' onClick={() => onDelete(review.id)}>Delete Review</button>
                </div> */}
            </form>
            <UploadImageModal />
        </>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

export default EditReviewForm;
