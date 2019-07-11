import React from 'react';
import axios from 'axios';
import OrderCard from './OrderCard.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bearerToken: null, orders: [] };
        this.authenticate();
    }

    authenticate = async () => {
        axios.get('http://localhost/Supplies-store-API/orders').then(response => {
            this.setState({ orders: response.data })
        });
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