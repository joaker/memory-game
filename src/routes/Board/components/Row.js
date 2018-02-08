import React from 'react';
import PropTypes from 'prop-types';

export const Row = ({ children, className = '' }) => (
    <div role='row' className={"board__row " + className}>
        {children}
    </div>
);

Row.propTypes = {
    className: PropTypes.any,
    children: PropTypes.any,
};

export default Row;
