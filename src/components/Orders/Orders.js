import React from 'react';
import OrderCard from './OrderCard.js';
import Supplies from '../../api/Supplies.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bearerToken: null, orders: [] };
        this.suppliesDataService = new Supplies();
        this.authenticate();
    }

    authenticate = async () => {
        const response = await this.suppliesDataService.load('orders');
        this.setState({ orders: response })
    }

    renderOrders = () => {
        const orders = this.state.orders.map(order => {
            return <OrderCard key={order.id} order={order} />
        });
        return <div className="order-list" > {orders} </div>
    }
    render() {
        return (
            <div className="master">
                {this.renderOrders()}
            </div>
        );
    }
}