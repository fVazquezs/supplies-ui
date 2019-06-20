import React from 'react';
import ProductCard from './ProductCard.js';
import ProductDataService from './ProductDataService.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = { bearerToken: null, products: [], order: [] };
        this.productDataService = new ProductDataService();
        this.load();
    }

    load = async () => {
        const response = await this.productDataService.loadProducts();
        console.log('response in the load function', response)
        this.setState({ products: response })

    }

    addProductToOrder = (order) => {
        var newOrders = this.state.order.slice();
        newOrders.push(order);
        this.setState({ order: newOrders })
        console.log(this.state.order)
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