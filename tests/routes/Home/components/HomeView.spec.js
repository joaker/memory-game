import React from 'react';
import { HomeView } from 'routes/Home/components/HomeView';
import { render } from 'enzyme';

describe('(View) Home', () => {
    let _component;

    beforeEach(() => {
        _component = render(<HomeView />);
    });

    it('Renders a welcome message', () => {
        const welcome = _component.find('h1');
        expect(welcome).to.exist();
        // test for message - requires a long delay
        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //         expect(welcome.text()).to.match(/Would you like to play a game?/);
        //         resolve();
        //     }, 10000);
        // });
    });

    it('Renders a start button', () => {
        const start = _component.find('a');
        expect(start).to.exist();
        expect(start.text()).to.match(/Start/);
    });
});
