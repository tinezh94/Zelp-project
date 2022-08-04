import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadImages } from "../../store/image";

const AllImages = () => {
    const history = useHistory();
    const { businessId } = useParams();
    const dispatch = useDispatch();

    const images = useSelector(state => state?.images);

    const bizImagesArr = images ? Object.values(images) : null;

    useEffect(() => {
        dispatch(loadImages());
    }, [dispatch])

    const bizImages = bizImagesArr?.filter(image => {
        return image.business_id === Number(businessId);
    })

    return (
        <>
            <div>
                {bizImages && bizImages.map(image => (
                    <img src={image.image_url} style={{width: 500, height: 350 }} />
                ))}
            </div>
        </>
    )
};

export default AllImages;   