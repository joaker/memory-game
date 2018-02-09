'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './Board.scss';
import Card from '../containers/CardContainer';
import classnames from 'classnames';

export class Board extends React.PureComponent {
    componentDidMount () {
        this.props.startGame();
    }
    render () {
        const cells = this.props.cardSymbols.map((card, index) => ((
            <Card key={index} number={index}/>
        )));

        const className = classnames('board__page__wrapper', {
            winner: this.props.winner,
        });
        return (
            <div className={className}>
                <h2 className='title'>Memory Game</h2>
                <h3 className='successMessage'>Congratulations - you won!</h3>
                <div className='board__page'>
                    {cells}
                </div>
            </div>
        );
    }
}

Board.propTypes = {
    startGame: PropTypes.func.isRequired,
    cardSymbols: PropTypes.array.isRequired,
    winner: PropTypes.bool,
};

export default Board;
