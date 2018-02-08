import { withRouter } from 'react-router-dom';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_EVENT = 'ADD_EVENT';
export const EDIT_EVENT = 'EDIT_EVENT';

// ------------------------------------
// Actions
// ------------------------------------
export function goto (path = '/') {
    return () => {
        withRouter(({ history }) => {
            history.push(path);
        });
    };
}

export const actions = {
    goto,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    // [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
    // [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
