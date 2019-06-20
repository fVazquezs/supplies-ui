import React from 'react';
import CartCard from './CartCard';

export default class extends React.Component {

    renderCart = () => {
        if (this.props.cart !== undefined) {
            const products = this.props.cart.map(product => {
                return <CartCard key={product.id} product={product}  />
            });
            return <div className="product-list" > {products} </div>
        }
    }

    render() {
        return (
            <div>
                {this.renderCart()}
                <button className="ui button" > Finish</button>
            </div>
        )
    }
}