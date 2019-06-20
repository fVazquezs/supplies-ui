import axios from 'axios';

export default class {
    loadProducts = async () => {
        await axios.get('http://localhost/Supplies-store-API/products').then(response => {
            this.response = response.data;
        });
        return this.response;
    }
}