import React from 'react';
import axios from 'axios';
import UserCard from './UserCard.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bearerToken: null, users: [] };
        this.authenticate();
    }

    authenticate = async () => {
        axios.get('http://localhost/Supplies-store-API/users').then(response => {
            console.log(response.data);
            this.setState({ users: response.data })
        });
    }

    renderUsers = () => {
        const users = this.state.users.map(user => {
            return <UserCard key={user.id} user={user} />
        });
        return <div className="user-list" > {users} </div>
    }
    render() {
        return (
            <div className="master">
                {this.renderUsers()}
            </div>
        );
    }
}