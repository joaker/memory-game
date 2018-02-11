import BoardRoute from 'routes/Board';

describe('(Route) Board', () => {
    it('returns a route configuration object', () => {
        const config = BoardRoute({});
        expect(typeof config).to.equal('object');
    });

    it('has a path \'board\'', () => {
        expect(BoardRoute({}).path).to.equal('board');
    });
});
