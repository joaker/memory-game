import BoardRoute from 'routes/Board';

describe('(Route) Board', () => {
    it('returns a route configuration object', () => {
        expect(typeof BoardRoute({})).to.equal('object');
    });

    it('has a path \'board\'', () => {
        expect(BoardRoute({}).path).to.equal('Board');
    });
});
