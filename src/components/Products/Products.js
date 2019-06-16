import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bearerToken: null, products: [] };
        this.authenticate();
    }

    authenticate = async () => {
        axios.get('http://localhost/Supplies-store-API/products').then(response => {
            console.log(response.data);
            this.setState({ products: response.data })
        });
    }

    renderProducts = () => {
        const products = this.state.products.map(product => {
            return <ProductCard key={product.id} product={product} />
        });
        return <div className="product-list" > {products} </div>
    }
    render() {
        return (
            <div className="master">
                {this.renderProducts()}
            </div>
        );
    }
}