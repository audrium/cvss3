import { replace } from 'react-router-redux';

export const HIDE_SNACKBAR = 'app/HIDE_SNACKBAR';
export const OPEN_SNACKBAR = 'app/OPEN_SNACKBAR';

const initialState = {
    snackbarShown: false,
    snackbarMessage: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case HIDE_SNACKBAR: {
            return { ...state, snackbarShown: false }
        }

        case OPEN_SNACKBAR: {
            return { ...state, snackbarShown: true, snackbarMessage: action.payload }
        }

        default:
            return state
    }
}

export const hideSnackbar = (event, reason) => {
    return {
        type: HIDE_SNACKBAR
    }
}

export const openSnackbar = (message) => {
    return {
        type: OPEN_SNACKBAR,
        payload: message
    }
}

export const updateVectorURL = () => {
    return (dispatch, getState) => {
        const { location } = getState().router;
        const { vector } = getState().main;
        dispatch(replace({ ...location, hash: vector }));
    }
}
