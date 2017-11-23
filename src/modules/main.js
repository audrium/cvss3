export const UPDATE_VECTOR = 'UPDATE_VECTOR';
export const UPDATE_BASE_SCORES = 'UPDATE_BASE_SCORES';
export const UPDATE_BASE_VALUES = 'UPDATE_BASE_VALUES';
export const UPDATE_TEMPORAL_VALUES = 'UPDATE_TEMPORAL_VALUES';

const initialBaseValues = {
    AV: null,
    AC: null,
    PR: null,
    UI: null,
    S: null,
    C: null,
    I: null,
    A: null,
}

const initialTemporalValues = {
    E: 'X',
    RL: 'X',
    RC: 'X',
}

const initialState = {
    vector: null,

    baseScores: null,
    baseValues: { ...initialBaseValues },

    tempScores: null,
    tempValues: { ...initialTemporalValues },
}

export default (state = initialState, action) => {
    switch (action.type) {

        case UPDATE_VECTOR: {
            const { vector } = action.payload;
            return { ...state, vector: vector ? vector : state.vector }
        }

        case UPDATE_BASE_SCORES: {
            const { baseScores } = action.payload;
            return { ...state, baseScores: baseScores ? baseScores : state.baseScores }
        }

        case UPDATE_BASE_VALUES: {
            const { values, vector, baseScores } = action.payload;
            return {
                ...state,
                baseValues: values,
                baseScores: baseScores,
                vector: vector
            }
        }

        case UPDATE_TEMPORAL_VALUES: {
            const { values, vector, tempScores } = action.payload;
            return {
                ...state,
                tempValues: values,
                tempScores: tempScores,
                vector: vector
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

export const nullBaseValues = () => dispatch => {
    return dispatch(updateBaseValues({
        values: { ...initialBaseValues },
        baseScores: null,
        vector: null,
    }));
}

export const updateTempValues = payload => dispatch => {
    dispatch({
        type: UPDATE_TEMPORAL_VALUES,
        payload: payload
    });
    return Promise.resolve();
}

export const updateVector = (vector) => {
    return {
        type: UPDATE_VECTOR,
        payload: vector
    }
}

export const updateBaseScores = (scores) => {
    return {
        type: UPDATE_BASE_SCORES,
        payload: scores
    }
}
