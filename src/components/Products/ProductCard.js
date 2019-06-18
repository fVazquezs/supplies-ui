import React from 'react';
import './ProductCard.css';

export default class extends React.Component {
    constructor() {
        super();
        this.state = ({ buttons: '' })
    }

    expandContent = () => {
        this.setState({ buttons: <button className="ui button">buy</button> });
    }
    
    minifyContent = () => {
        this.setState({ buttons: '' });
    }

    render() {
        return (
            <div onMouseEnter={this.expandContent} onMouseLeave={this.minifyContent} className="product-card-container">
                <div className="product-image"></div>
                <div className='product-name'>{this.props.product.name}</div>
                {this.state.buttons}

            </div>
        );
    }
}