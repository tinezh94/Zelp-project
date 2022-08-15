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
    const [ validationErrors, setValidationErrors ] = useState([]);
    const [ hasSubmitted, setHasSubmitted ] = useState(false);

    const onDelete = async (id) => {
        setHasSubmitted(true);
        console.log('errors', validationErrors)
        if (validationErrors.length === 0) {
            await dispatch(deleteReview(id));
        }
        else {
            return (
                <div className='remove-review-errors'>
                    {/* {hasSubmitted && validationErrors.length > 0 && ( */}
                        <ul className='remove-review-errors-ul'>
                            {validationErrors.map(error => (
                                <li className='remove-review-error-msg' key={error}>{error}</li>
                            ))}
                        </ul>
                    {/* )} */}
                </div>
            )
        }
        hideForm();
        setHasSubmitted(false);
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

    console.log('reason~~~', reason)
    useEffect(() => {
        const errors = [];
        console.log('reason', reason)
        if (reason.length === 0) errors.push('Please select one of the following reasons.');
        setValidationErrors(errors);
    }, [reason])

    return (
        <div>
            <div>
            <button className='biz-review-delete-btn' type='button' onClick={() => setShowModal(true)}>Remove Review</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} className='remove-review-container'>
                    <div className="remove-review-modal">
                        <h2 className="remove-review-h2">Remove Review</h2>
                        <div className='remove-review-errors'>
                            {hasSubmitted && validationErrors.length > 0 && (
                                <ul className='remove-review-errors-ul'>
                                    {validationErrors.map(error => (
                                        <li className='remove-review-error-msg' key={error}>{error}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <h4 className="remove-review-h4">Why do you want to remove this review?</h4>
                        <div className="remove-review-form">
                            <form className="remove-review-form">
                                <div className="remove-review-input-div">
                                    <input 
                                        type="radio"
                                        name='reason'
                                        value='legal action'
                                        onChange={(e) => setReason(e.target.value)}
                                        checked={reason === 'legal action'}
                                    />
                                    <label htmlFor="reason" className="remove-review-label">I was threatened with legal action or sued.</label>
                                </div>
                                <div className="remove-review-input-div">
                                    <input 
                                        type="radio"
                                        name='reason'
                                        value='refund'
                                        onChange={(e) => setReason(e.target.value)}
                                        checked={reason === 'refund'}
                                    />
                                    <label htmlFor="reason" className="remove-review-label">I was offered a refund or other compensation to remove this review.</label>
                                </div>
                                <div className="remove-review-input-div">
                                    <input 
                                        type="radio"
                                        name='reason'
                                        value='changed opinion'
                                        onChange={(e) => setReason(e.target.value)}
                                        checked={reason === 'changed opinion'}
                                    />
                                    <label htmlFor="reason" className="remove-review-label">I changed my opinion of this business after a new interaction.</label>
                                </div>
                                <div className="remove-review-input-div">
                                    <input 
                                        type="radio"
                                        name="reason"
                                        value='other'
                                        checked={reason === 'other'}
                                        onChange={(e) => setReason(e.target.value)}
                                    />
                                    <label htmlFor="reason" className="remove-review-label">Other</label>
                                </div>
                            <div className="remove-reviews-btns-div">
                                <button className="remove-review-confirm-btn" type="button" onClick={() => onDelete(review.id)}>Remove Review</button>
                                <button className="remove-review-cancel-btn" type="button" onClick={onCancel}>Keep Review</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
};

export default DeleteReviewModal;