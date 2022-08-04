const LOAD = '/imagesLOAD';
// const LOAD_SINGLE_BUSINESS = '/imagesLOAD_SINGLE_BUSINESS';
const CREATE = '/imagesCREATE';
const EDIT = 'images/EDIT';
const REMOVE = '/imagesREMOVE';

const load = images => ({
    type: LOAD,
    images
})

// const loadSingleBusiness = business => ({
//     type: LOAD_SINGLE_BUSINESS,
//     business
// })

const create = image => ({
    type: CREATE,
    image
})

const edit = image => ({
    type: EDIT,
    image
})

const remove = imageId => ({
    type: REMOVE,
    imageId
})

export const loadImages = () => async (dispatch) => {
    const res = await fetch ('/api/images/');

    if (res.ok) {
        const images = await res.json();
        dispatch(load(images));
    };
};

export const createImage = (payload) => async (dispatch) => {
    console.log('inside create', payload)
    const { user_id, business_id, image_url } = payload;
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('business_id', business_id);
    formData.append('image_url', image_url);

    const res = await fetch ('/api/images/', {
        method: 'POST',
        body: formData
    });

    if (res.ok) {
        const image = await res.json();
        dispatch(create(image));
        return image;
    };
};

export const editImage = payload => async (dispatch) => {
    // console.log('inside thunK, payload', payload)
    const res = await fetch (`/api/images/${payload.id}`, {
        method: 'PUT',
        // headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    // console.log('inside thunk, res', res)
    if (res.ok) {
        const image = await res.json();
        console.log('inside thunk after res.ok', image)
        dispatch(edit(image));
        return image;
    };
};

export const deleteImage = imageId => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(remove(imageId));
    };
};

let newState;

export default function imagesReducer(state = {}, action) {
    switch (action.type) {
        case LOAD:
            newState = {};
            const imagesList = action.images['images']
            imagesList.forEach(image => {
                newState[image.id] = image
            });
            return newState;

        case CREATE:
            newState = { ...state };
            newState[action.image.id] = action.image;
            return newState;

        case EDIT:
            newState = { ...state };
            newState[action.image.id] = action.image;
            return newState;

        case REMOVE:
            newState = { ...state };
            delete newState[action.imageId];
            return newState;

        default:
            return state;
    }   
}