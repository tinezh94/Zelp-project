const LOAD = '/maps/LOAD';

const load = key => ({
    type: LOAD,
    key
})

export const loadKey = () => async (dispatch) => {
    const res = await fetch('/api/businesses/google_maps_api');
    console.log('map thunk', res)
    if (res.ok) {
        const key = await res.json();
        dispatch(load(key));
        console.log('after res', key)
    }
}

export default function keyReducer (state = {}, action) {
    switch (action.type) {
        case LOAD:
            return {'api_key': action.key}
        default:
            return state;
    }
}