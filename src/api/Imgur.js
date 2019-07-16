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
                'Authorization': "Client-ID c7439bcbff83c5d"
            }
        };
    }

    postImage = async (body) => {
        console.log(body)
        await axios.post("https://api.imgur.com/3/image", body, this.getTokenHeader()).then(response => {
            this.response = response.data;
        });
        return this.response;
    }
}