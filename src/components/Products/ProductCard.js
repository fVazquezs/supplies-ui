import React from 'react';
import './ProductCard.css';

export default class extends React.Component {
    constructor() {
        super();
        this.state = ({ buttons: '' })
    }

    render() {
        return (
            <div onMouseEnter={this.expandContent} onMouseLeave={this.minifyContent} className="product-card-container">
                <div className="product-image"></div>
                <div className='product-name'>{this.props.product.name}</div>
                <button className="ui button" onClick={() => this.props.addToOrder(this.props.product)}>Add</button>
            </div>
        );
    }
}