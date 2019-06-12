import React from 'react';
import './ProductCard.css';

export default class extends React.Component {
    render() {
        return (
            <div className="product-card-container">
                <div className="product-image"></div>
                <div className='product-name'>Pencil</div>
            </div>
        );
    }
}