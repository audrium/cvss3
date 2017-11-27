export const CLEAR_VALUES = 'CLEAR_VALUES';
export const SET_VALUES = 'SET_VALUES';
export const UPDATE_BASE_VALUES = 'UPDATE_BASE_VALUES';
export const UPDATE_TEMPORAL_VALUES = 'UPDATE_TEMPORAL_VALUES';
export const UPDATE_ENV_VALUES = 'UPDATE_ENV_VALUES';

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

export const initialEnvValues = {
    CR: 'X',
    IR: 'X',
    AR: 'X',
    MAV: 'X',
    MAC: 'X',
    MPR: 'X',
    MUI: 'X',
    MS: 'X',
    MC: 'X',
    MI: 'X',
    MA: 'X',
}

const initialState = {
    vector: null,

    baseVector: null,
    baseScores: null,
    baseValues: { ...initialBaseValues },

    tempVector: null,
    tempScores: null,
    tempValues: { ...initialTemporalValues },

    envVector: null,
    envScores: null,
    envValues: { ...initialEnvValues },
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

                envVector: action.payload.envVector,
                envScores: action.payload.envScores,
                envValues: action.payload.envValues,
            }
        }

        case UPDATE_BASE_VALUES: {
            const { values, vector, baseScores, tempScores, envScores } = action.payload;
            const tempVector = state.tempVector || "";
            const envVector = state.envVector || "";
            return {
                ...state,
                baseValues: values,
                baseScores: baseScores,
                baseVector: vector,
                tempScores: tempScores,
                envScores: envScores,
                vector: vector ? vector + tempVector + envVector : null,
            }
        }

        case UPDATE_TEMPORAL_VALUES: {
            const { values, vector, tempScores, envScores } = action.payload;
            const envVector = state.envVector || "";
            return {
                ...state,
                tempValues: values,
                tempScores: tempScores,
                tempVector: vector,
                envScores: envScores,
                vector: state.baseVector + vector + envVector,
            }
        }

        case UPDATE_ENV_VALUES: {
            const { values, vector, envScores } = action.payload;
            const tempVector = state.tempVector || "";
            return {
                ...state,
                envValues: values,
                envScores: envScores,
                envVector: vector,
                vector: state.baseVector + tempVector + vector,
            }
        }

        default:
            return state
    }
}

export const setValues = payload => dispatch => {
    return dispatch({
        type: SET_VALUES,
        payload: payload
    });
}

export const clearValues = () => dispatch => {
    return dispatch({
        type: CLEAR_VALUES
    });
}

export const updateBaseValues = payload => dispatch => {
    dispatch({
        type: UPDATE_BASE_VALUES,
        payload: payload
    });
    return Promise.resolve();
}

export const updateTempValues = payload => dispatch => {
    dispatch({
        type: UPDATE_TEMPORAL_VALUES,
        payload: payload
    });
    return Promise.resolve();
}

export const updateEnvValues = payload => dispatch => {
    dispatch({
        type: UPDATE_ENV_VALUES,
        payload: payload
    });
    return Promise.resolve();
}