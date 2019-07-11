import React from 'react';
import './OrderCard.css';

export default class extends React.Component {
    render() {
        return (
            <div className="order-card-container">
                <div className='order-user'>{this.props.order.user}</div>
                <div className='order-note'>{this.props.order.notes}</div>
                <div className='order-date'>{this.props.order.date}</div>
            </div>
        );
    }
}