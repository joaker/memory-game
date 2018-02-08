import {
    CALENDAR_INCREMENT,
    increment,
    doubleAsync,
    default as boardReducer
} from 'routes/Board/modules/board';

describe('(Redux Module) Board', () => {
    it('Should export a constant CALENDAR_INCREMENT.', () => {
        expect(CALENDAR_INCREMENT).to.equal('CALENDAR_INCREMENT');
    });

    describe('(Reducer)', () => {
        it('Should be a function.', () => {
            expect(boardReducer).to.be.a('function');
        });

        it('Should initialize with a state of 0 (Number).', () => {
            expect(boardReducer(undefined, {})).to.equal(0);
        });

        it('Should return the previous state if an action was not matched.', () => {
            let state = boardReducer(undefined, {});
            expect(state).to.equal(0);
            state = boardReducer(state, { type: '@@@@@@@' });
            expect(state).to.equal(0);
            state = boardReducer(state, increment(5));
            expect(state).to.equal(5);
            state = boardReducer(state, { type: '@@@@@@@' });
            expect(state).to.equal(5);
        });
    });

    describe('(Action Creator) increment', () => {
        it('Should be exported as a function.', () => {
            expect(increment).to.be.a('function');
        });

        it('Should return an action with type "CALENDAR_INCREMENT".', () => {
            expect(increment()).to.have.property('type', CALENDAR_INCREMENT);
        });

        it('Should assign the first argument to the "payload" property.', () => {
            expect(increment(5)).to.have.property('payload', 5);
        });

        it('Should default the "payload" property to 1 if not provided.', () => {
            expect(increment()).to.have.property('payload', 1);
        });
    });

    describe('(Action Creator) doubleAsync', () => {
        let _globalState;
        let _dispatchSpy;
        let _getStateSpy;

        beforeEach(() => {
            _globalState = {
                board : boardReducer(undefined, {})
            };
            _dispatchSpy = sinon.spy((action) => {
                _globalState = {
                    ..._globalState,
                    board : boardReducer(_globalState.board, action)
                };
            });
            _getStateSpy = sinon.spy(() => {
                return _globalState;
            });
        });

        it('Should be exported as a function.', () => {
            expect(doubleAsync).to.be.a('function');
        });

        it('Should return a function (is a thunk).', () => {
            expect(doubleAsync()).to.be.a('function');
        });

        it('Should return a promise from that thunk that gets fulfilled.', () => {
            return doubleAsync()(_dispatchSpy, _getStateSpy).should.eventually.be.fulfilled;
        });

        it('Should call dispatch and getState exactly once.', () => {
            return doubleAsync()(_dispatchSpy, _getStateSpy)
                .then(() => {
                    _dispatchSpy.should.have.been.calledOnce();
                    _getStateSpy.should.have.been.calledOnce();
                });
        });

        it('Should produce a state that is double the previous state.', () => {
            _globalState = { board: 2 };

            return doubleAsync()(_dispatchSpy, _getStateSpy)
                .then(() => {
                    _dispatchSpy.should.have.been.calledOnce();
                    _getStateSpy.should.have.been.calledOnce();
                    expect(_globalState.board).to.equal(4);
                    return doubleAsync()(_dispatchSpy, _getStateSpy);
                })
                .then(() => {
                    _dispatchSpy.should.have.been.calledTwice();
                    _getStateSpy.should.have.been.calledTwice();
                    expect(_globalState.board).to.equal(8);
                });
        });
    });

    // NOTE: if you have a more complex state, you will probably want to verify
    // that you did not mutate the state. In this case our state is just a number
    // (which cannot be mutated).
    describe('(Action Handler) CALENDAR_INCREMENT', () => {
        it('Should increment the state by the action payload\'s "value" property.', () => {
            let state = boardReducer(undefined, {});
            expect(state).to.equal(0);
            state = boardReducer(state, increment(1));
            expect(state).to.equal(1);
            state = boardReducer(state, increment(2));
            expect(state).to.equal(3);
            state = boardReducer(state, increment(-3));
            expect(state).to.equal(0);
        });
    });
});
