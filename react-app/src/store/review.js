const LOAD = '/reviews/LOAD';
// const LOAD_SINGLE_BUSINESS = '/businesses/LOAD_SINGLE_BUSINESS';
const CREATE = '/reviews/CREATE';
const EDIT = '/reviews/EDIT';
const REMOVE = '/reviews/REMOVE';

const load = reviews => ({
    type: LOAD,
    reviews
})

// const loadSingleBusiness = businesses => ({
//     type: LOAD_SINGLE_BUSINESS,
//     businesses
// })

const create = review => ({
    type: CREATE,
    review
})

const edit = review => ({
    type: EDIT,
    review
})

const remove = reviewId => ({
    type: REMOVE,
    reviewId
})

export const loadReviews = () => async (dispatch) => {
    const res = await fetch ('/api/reviews/');

    if (res.ok) {
        const reviews = await res.json();
        dispatch(load(reviews));
    };
};

// export const loadOneBusiness = (businessId) => async (dispatch) => {
//     const res = await fetch(`/api/businesses/${businessId}`);

//     if (res.ok) {
//         const business = await res.json();
//         dispatch(loadSingleBusiness(business));
//     }
// }

export const createReview = (payload) => async (dispatch) => {
    console.log('inside create', payload)
    const res = await fetch (`/api/reviews/${payload.business_id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(create(review));
        return review;
    };
};

export const editReview = payload => async (dispatch) => {
    console.log('inside thunK, payload', payload)
    const res = await fetch (`/api/reviews/${payload.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    console.log('inside thunk, res', res)
    if (res.ok) {
        const review = await res.json();
        console.log('inside thunk after res.ok', review)
        dispatch(edit(review));
        return review;
    };
};

export const deleteReview = reviewId => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(remove(reviewId));
    };
};

let newState;

export default function reviewsReducer(state = {}, action) {
    switch (action.type) {
        case LOAD:
            newState = {};
            const reviewsList = action.reviews['reviews']
            reviewsList.forEach(review => {
                newState[review.id] = review
            });
            return newState;

        // case LOAD_SINGLE_BUSINESS:
        //     newState = {};
        //     newState[action.businessId] = action.business;
        //     return newState;

        case CREATE:
            newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;

        case EDIT:
            newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;

        case REMOVE:
            newState = { ...state };
            delete newState[action.reviewId];
            return newState;

        default:
            return state;
    }   
}