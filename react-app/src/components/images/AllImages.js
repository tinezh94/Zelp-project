import React, {useEffect, useState} from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadImages } from "../../store/image";
import '../businesses/business.css';

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

    console.log('bizimages', bizImages)

    return (
        <>
            <div className="images-container">
                {bizImages && bizImages.map((image,idx) => (
                    <div className="biz-img-container" key={idx}>
                        <div className="biz-img" style={{ backgroundImage: `linear-gradient(180deg,#0000 31.42%,#000), url(${image.image_url})`}}></div>
                        {/* <img src={image.image_url} style={{width: 500, height: 350 }} /> */}
                    </div>
                ))}
            </div>
            <div className="see-all-photos-div">
                <NavLink to={`/biz-photos/${businessId}`}>
                    <button className="see-all-photos-btn">See {bizImages.length} Photos</button>
                </NavLink>
            </div>
        </>
    )
};

export default AllImages;   