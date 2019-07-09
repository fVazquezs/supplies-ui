import axios from 'axios';
import React from 'react';

export default class extends React.Component {
    constructor() {
        super();
        this.state = { token: sessionStorage.getItem('token') };
    }

    getTokenHeader() {
        return {
            headers: {
                Authorization: "bearer " + this.state.token
            }
        };
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
        console.log(this.state.token)
        await axios.get('http://localhost/Supplies-store-API/products', this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    loadUsers = async () => {
        await axios.get('http://localhost/Supplies-store-API/users', this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    createUser = async header => {
        await axios.post('http://localhost/Supplies-store-API/users', header, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    loadDepartments = async () => {
        await axios.get('http://localhost/Supplies-store-API/departments', this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    createDepartment = async header => {
        await axios.post('http://localhost/Supplies-store-API/departments', header, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    updateDepartment = async (id, header) => {
        await axios.put('http://localhost/Supplies-store-API/departments/' + id, header, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

}