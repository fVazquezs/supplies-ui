import './Products.css';
import React from 'react';
import ProductCard from './ProductCard.js';
import Supplies from '../../api/Supplies.js';
import Imgur from '../../api/Imgur';
import { Modal, Input, Button } from 'semantic-ui-react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: null, imagePreviewUrl: '', newProductModalActive: false, newProductName: '', newProductDescription: '', displayProducts: [], products: [], order: [], path: '' };
        this.suppliesDataService = new Supplies();
        this.imgur = new Imgur();
        this.load();
    }

    load = async () => {
        const products = await this.suppliesDataService.load('products');
        this.setState({ displayProducts: products, products })

    }
    
    filterProducts = data => {
        if (data === '') {
            this.setState({ displayProducts: this.state.products })
        } else {
            this.setState({
                displayProducts: this.state.products.filter(function (user) {
                    return user.name.includes(data);
                })
            })
        }
    }

    addProductToOrder = (order) => {
        var newOrders = this.state.order.slice();
        newOrders.push(order);
        this.setState({ order: newOrders })
    }

    uploadImage = async e => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
            });
        }
        reader.readAsDataURL(file)
    }

    createNewProduct = async () => {
        await this.suppliesDataService.createProduct('products', {
            "name": this.state.newProductName,
            "description": this.state.newProductDescription,
            "imgPath": ''
        }, this.state.file)
        this.setState({ newUserModalActive: false })
        this.load();
    }

    renderProducts = () => {
        if (this.state.displayProducts !== undefined) {
            const products = this.state.displayProducts.map(product => {
                return <ProductCard key={product.id} product={product} addToOrder={this.props.updateCart} reload={this.load} />
            });
            return <div className="product-list" > {products} </div>
        }
    }

    newProductModal = () => {
        return (
            <Modal className="new-product-modal" open={this.state.newProductModalActive}>
                <Modal.Header>New Product</Modal.Header>
                <Modal.Content>
                    <Modal.Description className="product-inputs">
                        <Input className="new-name-input" placeholder='Name' onChange={(event, data) => this.setState({ newProductName: data.value })} />
                        <Input className="new-description-input" placeholder='Description' onChange={(event, data) => this.setState({ newProductDescription: data.value })} />
                        <Input className="new-file-chooser" type='file' onChange={this.uploadImage} />
                    </Modal.Description>
                    <Button onClick={this.createNewProduct}>Create</Button>
                    <Button onClick={() => this.setState({ newProductModalActive: false })}>Cancel</Button>
                </Modal.Content>
            </Modal>
        )
    }
    render() {
        return (
            <div className="master">
                {this.newProductModal()}
                <div className="product-header">
                    <Input className="product-filter" placeholder="Search product" onChange={(e, data) => this.filterProducts(data.value)} />
                    <Button className="new-product-button" onClick={() => this.setState({ newProductModalActive: true })}>New</Button>
                </div>
                {this.renderProducts()}
            </div>
        );
    }
}