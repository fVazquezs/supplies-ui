import axios from 'axios';
import React from 'react';
import Imgur from './Imgur';

const paths = {
    baserUrl: '//supplies-store.herokuapp.com',
    entity: {
        products: '/products',
        users: '/users',
        departments: '/departments',
        orders: '/orders'
    },
    entityWithId: {
        products: '/products/',
        users: '/users/',
        departments: '/departments/',
        orders: '/orders/'
    }
}

export default class extends React.Component {
    constructor() {
        super();
        this.state = { token: sessionStorage.getItem('token') };
        this.imgurDataService = new Imgur();
    }

    getTokenHeader() {
        return {
            headers: {
                'Authorization': "bearer " + this.state.token
            }
        };
    }

    authenticate = async (email, password) => {
        await axios.post(paths.baserUrl + '/authenticate',
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

    load = async entity => {
        var url = paths.baserUrl + paths.entity[entity];
        await axios.get(url, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    create = async (entity, body) => {
        var url = paths.baserUrl + paths.entity[entity];
        await axios.post(url, body, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    createProduct = async (entity, body, image) => {
        const imageResponse = await this.imgurDataService.postImage(image);
        body.imgPath = imageResponse.data.id;
        this.response = this.create(entity, body);
        return this.response;
    }

    update = async (entity, id, body) => {
        var url = paths.baserUrl + paths.entityWithId[entity] + id;
        await axios.put(url, body, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

    updateProduct = async (entity, id, body, image) => {
        const imageResponse = await this.imgurDataService.postImage(image);
        body.imgPath = imageResponse.data.id;
        this.response = this.update(entity, id, body);
        return this.response;
    }

    delete = async (entity, id) => {
        var url = paths.baserUrl + paths.entityWithId[entity] + id;
        await axios.delete(url, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }

}