import React, {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { editImage } from "../../store/image";

const EditImage = () => {
    const history = useHistory();
    const { businessId } = useParams();
    const dispatch = useDispatch();

    const [EditImage, setEditImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

};

export default EditImage;
