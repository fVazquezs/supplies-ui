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

    createUser = async header => {
        await axios.post('http://localhost/Supplies-store-API/users', header).then(response => {
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

    createDepartment = async header => {
        await axios.post('http://localhost/Supplies-store-API/departments', header).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    updateDepartment = async (id, header) => {
        await axios.put('http://localhost/Supplies-store-API/departments/' + id, header).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

}