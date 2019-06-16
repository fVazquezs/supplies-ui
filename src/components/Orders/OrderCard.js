import React from 'react';
import './OrderCard.css';

export default class extends React.Component {
    render() {
        return (
            <div className="order-card-container">
                <div className="order-image"></div>
                <div className='order-name'>{this.props.order.name}</div>
            </div>
        );
    }
}