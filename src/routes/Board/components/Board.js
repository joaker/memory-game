'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './Board.scss';
import Card from '../containers/CardContainer';

export class Board extends React.PureComponent {
    componentDidMount () {
        this.props.startGame();
    }
    render () {
        const cells = this.props.cardSymbols.map((card, index) => ((
            <Card key={index} number={index}/>
        )));

        return (
            <div className='board__page__wrapper'>
                {cells}
            </div>
        );
    }
}

Board.propTypes = {
    startGame: PropTypes.func.isRequired,
    cardSymbols: PropTypes.array.isRequired,
};

export default Board;
