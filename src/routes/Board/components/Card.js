'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Card = ({ number, symbol, flipped, isMatched, disabled, toggleCard }) => {
    const className = classnames('flip-container cell', {
        flipped,
        disabled,
        isMatched,
    });
    return (
        <div className={className} onClick={() => toggleCard(number)}>
            <div className='flipper'>
                <div className='front'>
                    {number}
                </div>
                <div className='back'>
                    <i className='material-icons'>{symbol}</i>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    number: PropTypes.number.isRequired,
    symbol: PropTypes.any.isRequired,
    flipped: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    isMatched: PropTypes.bool.isRequired,
    toggleCard: PropTypes.func.isRequired,
};

export default Card;
