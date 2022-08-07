import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AllImages from '../images/AllImages';
import UploadImageModal from '../UploadImageModal';

const BizUploadImage = () => {
    return (
        <>
            <UploadImageModal />
            <AllImages />
        </>
    )
};

export default BizUploadImage;