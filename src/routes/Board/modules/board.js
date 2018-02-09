import { withRouter } from 'react-router-dom';
import symbols from './symbols';

// ------------------------------------
// Constants
// ------------------------------------
export const START_GAME = 'START_GAME';
export const TOGGLE_CARD = 'TOGGLE_CARD';
export const SET_PROPERTY = 'SET_PROPERTY';

// ------------------------------------
// Helpers
// ------------------------------------
function shuffle (a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const getSymbol = (state, number) => {
    const { board: { cardSymbols: { [number]: symbol } } } = state;
    return symbol;
};


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

export function setProperty (name, value) {
    return {
        type: SET_PROPERTY,
        name,
        value,
    };
}

export function startGame () {
    // create the deck
    const cardSymbols = [...symbols, ...symbols];

    // shuffle the deck
    shuffle(cardSymbols);

    return {
        type    : START_GAME,
        cardSymbols,
    };
}

export function toggleCard (number) {
    return (dispatch, getState) => {
        const state = getState();
        const symbol = getSymbol(state, number);

        const { board: { first, second, matched } } = state;

        const isAlreadyMatched = matched[number];
        if (isAlreadyMatched) {
            return;
        }

        const secondIsTaken = second !== null;
        if (secondIsTaken) {
            return;
        }

        if (first === null) { //
            return dispatch(setProperty('first', number));
        }

        const deactivateFirst = first === number;
        if (deactivateFirst) {
            return dispatch(setProperty('first', null));
        }

        const firstSymbol = getSymbol(state, first); // a new selection is made - activate the card
        dispatch(setProperty('second', number));
        const matchMade = firstSymbol === symbol; // if the second card matches the first, we have a match

        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch(setProperty('first', null));
                dispatch(setProperty('second', null));

                const nextMatched = {
                    ...matched,
                    [first]: firstSymbol,
                    [number]: symbol,
                };
                if (matchMade) {
                    dispatch(setProperty('matched', nextMatched));

                    const winner = !state.board.cardSymbols.some((symbol, i) => !nextMatched[i]);
                    if (winner) {
                        dispatch(setProperty('winner', winner));
                    }
                }

                resolve();
            }, 1000);
        });
    };
}

export const actions = {
    goto,
    startGame,
    toggleCard,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [START_GAME]              : (state, { cardSymbols }) => ({ ...{
        cardSymbols: [],
        first: null,
        second: null,
        matched: {
        },
        winner: false,
    }, cardSymbols }),
    [SET_PROPERTY]    : (state, { name, value }) => {
        return {
            ...state,
            [name]: value,
        };
    },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    cardSymbols: [],
    first: null,
    second: null,
    matched: {
    },
    winner: false,
};
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
