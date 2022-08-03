const LOAD = '/businesses/LOAD';
const LOAD_SINGLE_BUSINESS = '/businesses/LOAD_SINGLE_BUSINESS';
const CREATE = '/businesses/CREATE';
const EDIT = '/businesses/EDIT';
const REMOVE = '/businesses/REMOVE';

const load = businesses => ({
    type: LOAD,
    businesses
})

const loadSingleBusiness = businesses => ({
    type: LOAD_SINGLE_BUSINESS,
    businesses
})

const create = business => ({
    type: CREATE,
    business
})

const edit = business => ({
    type: EDIT,
    business
})

const remove = businessId => ({
    type: REMOVE,
    businessId
})


export const loadBusinesses = () => async (dispatch) => {
    const res = await fetch ('/api/businesses/');

    if (res.ok) {
        const businesses = await res.json();
        dispatch(load(businesses));
    };
};

export const loadOneBusiness = (businessId) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}`);

    if (res.ok) {
        const business = await res.json();
        dispatch(loadSingleBusiness(business));
    }
}

export const createBusiness = (payload) => async (dispatch) => {
    console.log('inside create', payload)
    const res = await fetch ('/api/businesses/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const business = await res.json();
        dispatch(create(business));
        return business;
    };
};

export const editBusiness = payload => async (dispatch) => {
    console.log('inside thunK, payload', payload)
    const res = await fetch (`/api/businesses/${payload.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    console.log('inside thunk, res', res)
    if (res.ok) {
        const business = await res.json();
        console.log('inside thunk after res.ok', business)
        dispatch(edit(business));
        return business;
    };
};

export const deleteBusiness = businessId => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(remove(businessId));
    };
};



let newState;

export default function businessesReducer(state = {}, action) {
    switch (action.type) {
        case LOAD:
            newState = {};
            const businessesList = action.businesses['businesses']
            businessesList.forEach(business => {
                newState[business.id] = business
            });
            return newState;

        case LOAD_SINGLE_BUSINESS:
            newState = {};
            newState[action.businessId] = action.business;
            return newState;

        case CREATE:
            newState = { ...state };
            newState[action.business.id] = action.business;
            return newState;

        case EDIT:
            newState = { ...state };
            newState[action.business.id] = action.business;
            return newState;

        case REMOVE:
            newState = { ...state };
            delete newState[action.businessId];
            return newState;

        default:
            return state;
    }   
}