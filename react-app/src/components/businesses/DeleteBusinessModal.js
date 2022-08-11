import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { deleteBusiness } from "../../store/business";

const DeleteBizModal = ({ business }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [ showModal, setShowModal ] = useState(false);

    const onDelete = async (id) => {
        await dispatch(deleteBusiness(id));
        history.push('/');
    };

    const onCancel = e => {
        e.preventDefault();
        hideForm();
    }

    const hideForm = () => {
        setShowModal(false);
    }

    return (
        <div>
            <div>
                <button className='edit-biz-delete-btn' onClick={() => setShowModal(true)}>Delete Business</button>
            </div>
            <div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className='remove-biz-modal'>
                        <h2 className="remove-biz-h2">Remove Business Listing</h2>
                        <h3 className="remove-biz-h3">Are you sure you want to remove this listing?</h3>
                        <h4 className="reomove-biz-h4">Removing the business from Zelp will be permanent and cannot be undone.</h4>
                        <div className="remove-biz-btns-div">
                            <button className="remove-biz-confirm-btn" type='button' onClick={() => onDelete(business.id)}>Remove Business</button>
                            <button className="remove-biz-cancel-btn" type='button' onClick={onCancel}>Keep Business</button>
                        </div>
                    </div>
                </Modal>
            )}
            </div>
        </div>

    )
};

export default DeleteBizModal;