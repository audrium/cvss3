export const CLEAR_VALUES = 'CLEAR_VALUES';
export const SET_VALUES = 'SET_VALUES';
export const UPDATE_BASE_VALUES = 'UPDATE_BASE_VALUES';
export const UPDATE_TEMPORAL_VALUES = 'UPDATE_TEMPORAL_VALUES';

export const initialBaseValues = {
    AV: null,
    AC: null,
    PR: null,
    UI: null,
    S: null,
    C: null,
    I: null,
    A: null,
}

export const initialTemporalValues = {
    E: 'X',
    RL: 'X',
    RC: 'X',
}

const initialState = {
    vector: null,

    baseVector: null,
    baseScores: null,
    baseValues: { ...initialBaseValues },

    tempVector: null,
    tempScores: null,
    tempValues: { ...initialTemporalValues },
}

export default (state = initialState, action) => {
    switch (action.type) {

        case CLEAR_VALUES: {
            return { ...initialState }
        }

        case SET_VALUES: {
            return {
                vector: action.payload.vector,

                baseVector: action.payload.baseVector,
                baseScores: action.payload.baseScores,
                baseValues: action.payload.baseValues,

                tempVector: action.payload.tempVector,
                tempScores: action.payload.tempScores,
                tempValues: action.payload.tempValues,
            }
        }

        case UPDATE_BASE_VALUES: {
            const { values, vector, baseScores } = action.payload;
            const tempVector = state.tempVector || "";
            return {
                ...state,
                baseValues: values,
                baseScores: baseScores,
                baseVector: vector,
                vector: vector ? vector + tempVector : null,
            }
        }

        case UPDATE_TEMPORAL_VALUES: {
            const { values, vector, tempScores } = action.payload;
            return {
                ...state,
                tempValues: values,
                tempScores: tempScores,
                tempVector: vector,
                vector: state.baseVector + vector,
            }
        }

        default:
            return state
    }
}

export const updateBaseValues = payload => dispatch => {
    dispatch({
        type: UPDATE_BASE_VALUES,
        payload: payload
    });
    return Promise.resolve();
}

export const clearValues = () => dispatch => {
    return dispatch({
        type: CLEAR_VALUES
    });
}

export const updateTempValues = payload => dispatch => {
    dispatch({
        type: UPDATE_TEMPORAL_VALUES,
        payload: payload
    });
    return Promise.resolve();
}

export const setValues = payload => dispatch => {
    return dispatch({
        type: SET_VALUES,
        payload: payload
    });
}