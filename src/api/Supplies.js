import axios from 'axios';
import React from 'react';

export default class extends React.Component {
    constructor() {
        super();
        this.state = { token: null };
    }

    authenticate = async (email, password) => {
        await axios.post('http://localhost/Supplies-store-API/authenticate',
            {
                "email": email,
                "password": password
            }
        ).then(response => {
            this.response = response;
            if (response.data.token) {
                this.setState({ token: response.data.token })
            }
        });
        return this.response;
    }

    loadProducts = async () => {
        await axios.get('http://localhost/Supplies-store-API/products').then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    loadUsers = async () => {
        await axios.get('http://localhost/Supplies-store-API/users').then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    loadDepartments = async () => {
        await axios.get('http://localhost/Supplies-store-API/departments').then(response => {
            this.response = response.data;
        });
        return this.response;
    }

}