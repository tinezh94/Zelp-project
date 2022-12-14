import React, {useEffect, useState} from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadImages } from "../../store/image";
import { loadReviews } from "../../store/review";
import { FaStar } from 'react-icons/fa';
import { Modal } from "../../context/Modal";

const BizPhotos = ({ businesses }) => {
    const dispatch = useDispatch();
    const { businessId } = useParams();
    const images = useSelector(state => state?.images);
    const reviews = useSelector(state => state?.reviews);
    const bizImagesArr = images ? Object.values(images) : null;
    let business = Object.values(businesses)?.filter(biz => {
        return biz.id === Number(businessId)
    });

    business = business[0];
    // console.log('business', business)
    // console.log('reviews', reviews)
    const bizImages = bizImagesArr?.filter(image => {
        return image.business_id === Number(businessId);
    })

    const bizReviews = Object.values(reviews)?.filter(review => {
        return review.business_id === Number(businessId)
    });

    const bizPhoto = (id) => {
        return bizImagesArr.filter(image => image.business_id === id)[1];
    }

    const bizRatings = bizReviews.map(review => review.rating);
    const getAvrg = bizRatings.reduce((a, b) => a + b, 0) / bizRatings.length
    const totalFilled = Math.floor(getAvrg);
    const stars = Array(5).fill(0);

    useEffect(() => {
        dispatch(loadImages());
        dispatch(loadReviews());
    }, [dispatch])

    const [ showModal, setShowModal ] = useState(false);
    const [selected, setSelected ] = useState('');

    // console.log('modal', showModal)

    const handleClick = (e, idx) => {
        e.preventDefault();
        setShowModal(true)
        // console.log('modal', showModal)
        setSelected(idx)
        // console.log('selected', selected)
    }

    return (
        <>
            <div className="bizphotos-content-container">
                <h1 className="bizphotos-h1">Photos for {business?.name} </h1>
                <div className="bizphotos-biz-card">
                    <div className="bizphotos-biz-photo">
                        <div>
                            <NavLink to={`/businesses/${businessId}`}>
                                <img className="bizphotos-biz-img" src={bizPhoto(Number(businessId))?.image_url} />
                            </NavLink>
                        </div>
                        <div className="bizphotos-info-div">
                            <NavLink className='bizphotos-info-name' to={`/businesses/${businessId}`}>{business?.name}</NavLink>
                            <div className="bizphotos-rating-div">
                                <div>
                                    {stars.map((_, index) => (                                
                                        <FaStar
                                            key={index}
                                            isFilled={index + 1 < totalFilled}
                                            color={index < totalFilled ? "#f15c00" :  "#a9a9a9"}
                                            size={14}
                                        ></FaStar>
                                    ))}
                                </div>
                                <div className="bizphotos-reviews-ct">
                                    {bizReviews?.length} reviews
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <NavLink to={`/biz_user_photos/${businessId}/upload`}>
                            <button className="bizphotos-add-btn">Add photos</button>
                        </NavLink>
                    </div>
                </div>
                <div className="bizphotos-images-container">
                    {bizImages && bizImages.map((image,idx) => (
                        <div>
                            <div>
                                <img className="bizphotos-images-img" src={image.image_url} onClick={(e) => handleClick(e, idx)} />
                            </div>
                            <div id='enlarged-photo-div'>
                                {showModal && (
                                    <Modal onClose={() => setShowModal(false)}>
                                        <div id="enlarged-photo-modal">
                                            <img className="enlarged-img" src={bizImages[selected].image_url} style={{width: '550px', height: '550px', objectFit: 'contain'}} />
                                        </div>
                                    </Modal>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BizPhotos;