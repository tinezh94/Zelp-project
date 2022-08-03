const LOAD = '/categories/LOAD';

const load = categories => ({
    type: LOAD,
    categories
});

export const loadCategories = () => async (dispatch) => {
    const res = await fetch('/api/categories/');

    if (res.ok) {
        const categories = await res.json();
        console.log('inside load categories thunk', categories)
        dispatch(load(categories));
    }
};



export default function categoriesReducer(state = {}, action) {
    switch (action.type) {
        case LOAD:
            let newState = {};
            const categoriesList = action.categories['categories'];
            categoriesList.forEach(category => {
                newState[category.id] = category
            });
            return newState;
        default:
            return state;
    };
};
