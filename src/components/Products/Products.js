import React from 'react';
import ProductCard from './ProductCard.js';
import Supplies from '../../api/Supplies.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bearerToken: null, products: [], order: [] };
        this.suppliesDataService = new Supplies();
        this.load();
    }

    load = async () => {
        const response = await this.suppliesDataService.load('products');
        this.setState({ products: response })

    }

    addProductToOrder = (order) => {
        var newOrders = this.state.order.slice();
        newOrders.push(order);
        this.setState({ order: newOrders })
    }

    renderProducts = () => {
        if (this.state.products !== undefined) {
            const products = this.state.products.map(product => {
                return <ProductCard key={product.id} product={product} addToOrder={this.props.updateCart} />
            });
            return <div className="product-list" > {products} </div>
        }
    }
    render() {
        return (
            <div className="master">
                {this.renderProducts()}
            </div>
        );
    }
}