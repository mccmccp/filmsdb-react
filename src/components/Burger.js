import React, { Component } from 'react';

import SearchInterface from '../components/SearchInterface';




class Burger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBurgerOpen: false,
        };
    }

    changeBurgerStatus = () => {
        this.setState( {isBurgerOpen: !this.state.isBurgerOpen} )
    };

    render() {
        return (
            <div>
                {this.state.isBurgerOpen ? <SearchInterface
                    className='scrollableContent searchWidth'
                    onGetDetailsPressed={this.props.onGetDetailsPressed}
                    changeBurgerStatus={this.changeBurgerStatus} /> :
                    <button className="burger" onClick={this.changeBurgerStatus}>...</button>
                }
            </div>
        )
    }
}


export default Burger;