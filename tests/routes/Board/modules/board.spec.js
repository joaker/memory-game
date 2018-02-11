import {
    START_GAME,
    SET_PROPERTY,
    setProperty,
    startGame,
    default as boardReducer
} from 'routes/Board/modules/board';

import cardSymbols from 'routes/Board/modules/symbols';

describe('(Redux Module) Board', () => {
    it('Should export a constant START_GAME.', () => {
        expect(START_GAME).to.equal('START_GAME');
    });
    it('Should export a constant SET_PROPERTY.', () => {
        expect(SET_PROPERTY).to.equal('SET_PROPERTY');
    });
    describe('(Reducer)', () => {
        it('Should be a function.', () => {
            expect(boardReducer).to.be.a('function');
        });

        it('Should initialize with a state of 0 (Number).', () => {
            const initialBoardState = boardReducer(undefined, {});
            expect(initialBoardState).to.exist();
            expect(initialBoardState.cardSymbols).to.exist();
            expect(initialBoardState.cardSymbols.length).to.equal(0);
        });

        it('Should return the previous state if an action was not matched.', () => {
            let initial = boardReducer(undefined, {});
            expect(initial).to.exist();
            let state = boardReducer(initial, { type: '@@@@@@@' });
            expect(state).to.equal(initial);
        });

        it('Sets initial clicks.', () => {
            let initial = boardReducer(undefined, {});
            let startedState = boardReducer(initial, { type: 'START_GAME', cardSymbols });
            let afterFirstClickState = boardReducer(startedState, {
                type: 'SET_PROPERTY',
                name: 'first',
                value: 3
            });

            expect(afterFirstClickState).to.exist();
            expect(afterFirstClickState.first).to.exist();
            expect(afterFirstClickState.first).to.equal(3);

            let afterSecondClickState = boardReducer(afterFirstClickState, {
                type: 'SET_PROPERTY',
                name: 'second',
                value: 4
            });

            expect(afterSecondClickState).to.exist();
            expect(afterSecondClickState.first).to.exist();
            expect(afterSecondClickState.first).to.equal(3);
            expect(afterSecondClickState.second).to.exist();
            expect(afterSecondClickState.second).to.equal(4);
        });


        it('Should create 12 card symbols.', () => {
            let initial = boardReducer(undefined, {});
            expect(initial).to.exist();
            expect(initial.cardSymbols).to.exist();
            expect(initial.cardSymbols.length).to.equal(0);
            let state = boardReducer(initial, { type: 'START_GAME', cardSymbols });
            expect(state).to.exist();
            expect(state.cardSymbols).to.exist();
            expect(state.cardSymbols.length).to.equal(12);
        });
    });

    describe('(Action Creator) setProperty', () => {
        it('Should be exported as a function.', () => {
            expect(setProperty).to.be.a('function');
        });

        it('Should return an action with type "SET_PROPERTY".', () => {
            expect(setProperty()).to.have.property('type', SET_PROPERTY);
        });
    });


    describe('(Action Creator) startGame', () => {
        it('Should be exported as a function.', () => {
            expect(startGame).to.be.a('function');
        });

        it('Should return an action with type "START_GAME".', () => {
            expect(startGame()).to.have.property('type', START_GAME);
        });
    });
});
