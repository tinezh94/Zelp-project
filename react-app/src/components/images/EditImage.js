// import React, {useEffect, useState} from "react";
// import { useHistory, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { editImage } from "../../store/image";

// const EditImage = () => {
//     const history = useHistory();
//     const { businessId } = useParams();
//     const dispatch = useDispatch();

//     const [EditImage, setEditImage] = useState(null);
//     const [imageLoading, setImageLoading] = useState(false);
//     const [validationErrors, setValidationErrors] = useState([]);
//     const [hasSubmitted, setHasSubmitted] = useState(false);

//     const user = useSelector(state => state?.session?.user)

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         setImageLoading(true)
//         setHasSubmitted(true)

//         const payload = {
//             user_id: user.id,
//             business_id: Number(businessId),
//             image_url: editImage
//         }

//         const editedImage = await dispatch(editImage(payload));
//         if (editedImage) {
//             reset();
//             setHasSubmitted(false);
//             history.push(`/businesses/${Number(businessId)}`);
//         }

//     }
//     const updateImage = (e) => {
//         const file = e.target.files[0];
//         setEditImage(file);
//     }

//     const reset = () => {
//         setEditImage(null);
//     }

//     return (
//         <>
//             <form onSubmit={onSubmit}>
//                 <input 
//                     type="file"
//                     accept="image/*"
//                     onChange={updateImage}
//                 />
//                 <button type='submit'>Submit</button>
//                 {imageLoading && <p>Loading ...</p>}
//             </form>
//         </>
//     )

// };

// export default EditImage;
