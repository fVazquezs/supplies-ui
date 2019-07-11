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
                'Authorization': "bearer " + this.state.token
            }
        };
    }

    authenticate = async (email, password) => {
        await axios.post('//supplies-store.herokuapp.com/authenticate',
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
        await axios.get('//supplies-store.herokuapp.com/products', this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    loadUsers = async () => {
        await axios.get('//supplies-store.herokuapp.com/users', this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    createUser = async body => {
        await axios.post('//supplies-store.herokuapp.com/users', body, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    updateUser = async (id, body) => {
        await axios.put('//supplies-store.herokuapp.com/users/' + id, body, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    deleteUser = async id => {
        await axios.delete('//supplies-store.herokuapp.com/users/' + id, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    loadDepartments = async () => {
        await axios.get('//supplies-store.herokuapp.com/departments', this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    createDepartment = async body => {
        await axios.post('//supplies-store.herokuapp.com/departments', body, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    updateDepartment = async (id, body) => {
        await axios.put('//supplies-store.herokuapp.com/departments/' + id, body, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    deleteDepartment = async id => {
        await axios.delete('//supplies-store.herokuapp.com/departments/' + id, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

}