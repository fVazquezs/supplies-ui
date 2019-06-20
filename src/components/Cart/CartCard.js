import React from 'react';
import './CartCard.css';

export default class extends React.Component {

    render() {
        return (
            <div className="cart-card-container">
                <div className='product-name'>{this.props.product.name}</div>
                {/* <div className='product-note'>{this.props.product.notes}</div>
                <div className='product-date'>{this.props.product.date}</div> */}
            </div>);
    }
}