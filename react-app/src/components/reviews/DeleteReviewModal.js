import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { deleteReview } from "../../store/review";

const DeleteReviewModal = ({ review, businessId, showMenu, setShowMenu }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [ showModal, setShowModal ] = useState(false);

    const [ reason, setReason ] = useState('');

    const onDelete = async (id) => {
        await dispatch(deleteReview(id));
        hideForm();
        setShowMenu(false);
        history.push(`/businesses/${businessId}`);
    }

    const onCancel = e => {
        e.preventDefault();
        setShowMenu(false);
        hideForm();
    }

    const hideForm = () => {
        setShowModal(false);
    }

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setReason(e.target.value);
    // }


    console.log('menu',showMenu)
    console.log('modal', showModal)

    return (
        <div>
            <div>
            <button className='biz-review-delete-btn' type='button' onClick={() => setShowModal(true)}>Remove Review</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} className='remove-review-container'>
                    <div className="remove-review-modal">
                        <h2 className="remove-review-h2">Remove Review</h2>
                        <h4 className="remove-review-h4">Why do you want to remove this review?</h4>
                        <div className="remove-review-form">
                            <form className="remove-review-form">
                                <div className="remove-review-input-div">
                                    <input 
                                        type="radio"
                                        value='reason'
                                        onChange={(e) => setReason(e.target.value)}
                                        // checked={'reason'}
                                    />
                                    <label>I was threatened with legal action or sued.</label>
                                </div>
                                <div className="remove-review-input-div">
                                    <input 
                                        type="radio"
                                        value='reason'
                                        onChange={(e) => setReason(e.target.value)}
                                        // checked={'reason'}
                                    />
                                    <label>I was offered a refund or other compensation to remove this review.</label>
                                </div>
                                <div className="remove-review-input-div">
                                    <input 
                                        type="radio"
                                        value='reason'
                                        onChange={(e) => setReason(e.target.value)}
                                        // checked={'reason'}
                                    />
                                    <label>I changed my opinion of this business after a new interaction.</label>
                                </div>
                            </form>
                            <div className="remove-reviews-btns-div">
                                <button className="remove-review-confirm-btn" type="button" onClick={() => onDelete(review.id)}>Remove Review</button>
                                <button className="remove-review-cancel-btn" type="button" onClick={onCancel}>Keep Review</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
};

export default DeleteReviewModal;