'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './Board.scss';

const Cell = ({ children }) => {
    return (
        <div className='cell'>
            {children}
        </div>
    );
};

Cell.propTypes = {
    children: PropTypes.any,
};

export const Board = () => {
    return (
        <div className='board__page__wrapper'>
            <Cell />
        </div>
    );
};

Board.propTypes = {

};

export default Board;
