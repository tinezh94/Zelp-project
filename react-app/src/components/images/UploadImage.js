import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createImage } from "../../store/image";

const UploadPicture = () => {
    const history = useHistory();
    const { businessId } = useParams();
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const user = useSelector(state => state?.session?.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        setHasSubmitted(true);
        
        const payload = {
            user_id: user.id,
            business_id: Number(businessId),
            image_url: image
        }

        const uploadedImage = await dispatch(createImage(payload));
        if (uploadedImage) {
            reset();
            setHasSubmitted(false);
            history.push(`/businesses/${Number(businessId)}`);
        }

    }
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const reset = () => {
        setImage(null);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                />
                <button type='submit'>Submit</button>
                {imageLoading && <p>Loading ...</p>}
            </form>
        </>
    )

};

export default UploadPicture;
