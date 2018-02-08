import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import './HomeView.scss';
import Typed from 'typed.js';

const buttonDelay = 4 * 1000;

class Typing extends React.Component {
    componentDidMount () {
        // If you want to pass more options as props, simply add
        // your desired props to this destructuring assignment.
        const { strings } = this.props;
        // You can pass other options here, such as typing speed, back speed, etc.
        const options = {
            strings,
            typeSpeed: 50,
            backSpeed: 50
        };

        // this.el refers to the <span> in the render() method
        this.typed = new Typed(this.el, options);
    }

    componentWillUnmount () {
        // Make sure to destroy Typed instance on unmounting
        // to prevent memory leaks
        this.typed.destroy();
    }

    render () {
        return (
            <span
                style={{ whiteSpace: 'pre' }}
                ref={(el) => { this.el = el; }}
            />
        );
    }
}

Typing.propTypes = {
    strings: PropTypes.arrayOf(PropTypes.string)
};


export class HomeView extends React.Component {
    constructor () {
        super();

        this.state = { reveal: false };
    }
    componentDidMount () {
        const reveal = () => this.setState({ reveal: true });
        setTimeout(() => {
            reveal();
        }, buttonDelay);
    }
    render () {
        const strings = ['^2000Would you like to play a game?'];
        const className = "delayed " + (this.state.reveal ? 'reveal' : '');
        const buttons = (
            <div className='buttons'>
                <Link to='/board'
                    role='button'
                    className={'btn btn-outline-success ' + className}
                    activeClassName='page-layout__nav-item--active'>
                  Start
                </Link>
            </div>
        );

        return (
            <div>
                <h1><Typing strings={strings}/></h1>
                <h2>{buttons}</h2>
            </div>
        );
    }
}

export default HomeView;
