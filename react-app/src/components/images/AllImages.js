import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadImages } from "../../store/image";

const AllImages = () => {
    const history = useHistory();
    const { businessId } = useParams();
    const dispatch = useDispatch();

    const bizImages = useSelector(state => state?.images);

    const bizImagesArr = bizImages ? Object.values(bizImages) : null;

    useEffect(() => {
        dispatch(loadImages());
    }, [dispatch])

    return (
        <>
            <div>
                {bizImagesArr && bizImagesArr.map(image => (
                    <img src={image.image_url} style={{width: 500, height: 350 }} />
                ))}
            </div>
        </>
    )
};

export default AllImages;   