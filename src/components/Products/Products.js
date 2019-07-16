import React from 'react';
import ProductCard from './ProductCard.js';
import Supplies from '../../api/Supplies.js';
import Imgur from '../../api/Imgur';
import { Modal, Input, Button } from 'semantic-ui-react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: null, imagePreviewUrl: '', newProductModalActive: false, products: [], order: [], path: '' };
        this.suppliesDataService = new Supplies();
        this.imgur = new Imgur();
        this.load();
    }

    load = async () => {
        const response = await this.suppliesDataService.load('products');
        this.setState({ products: response })

    }

    addProductToOrder = (order) => {
        var newOrders = this.state.order.slice();
        newOrders.push(order);
        this.setState({ order: newOrders })
    }

    renderProducts = () => {
        if (this.state.products !== undefined) {
            const products = this.state.products.map(product => {
                return <ProductCard key={product.id} product={product} addToOrder={this.props.updateCart} />
            });
            return <div className="product-list" > {products} </div>
        }
    }
    renderfakeimg = () => {
        console.log(this.state.path)
        if (this.state.path)
            return <img src={this.state.path} />;
    }
    uploadImage = async e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                path: reader.result
            });
        }

        reader.readAsDataURL(file)
        this.imgur.postImage(file)
        console.log("file",file)
        console.log('reader', reader)
        console.log(this.state);
        
    }
    newProductModal = () => {
        return (
            <Modal className="new-product-modal" open={this.state.newProductModalActive}>
                <Modal.Header>New Product</Modal.Header>
                <Modal.Content>
                    <Modal.Description className="product-inputs">
                        <Input type='file' id='multi' onChange={this.uploadImage} multiple />
                        {this.renderfakeimg()}
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
    render() {
        return (
            <div className="master">
                {this.newProductModal()}
                <Button className="new-product-button" onClick={() => this.setState({ newProductModalActive: true })}>New</Button>

                {this.renderProducts()}
            </div>
        );
    }
}