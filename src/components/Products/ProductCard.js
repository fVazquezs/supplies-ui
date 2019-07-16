import React from 'react';
import './ProductCard.css';
import { Modal, Input, Button } from 'semantic-ui-react';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Supplies from '../../api/Supplies';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            updateProductModalActive: false,
            deleteProductModalActive: false,
            newProductName: this.props.product.name,
            newProductDescription: this.props.product.description,
            newProductImgPath: this.props.product.imgPath,
        })
        this.suppliesDataService = new Supplies();
    }

    deleteProduct = async () => {
        await this.suppliesDataService.delete('products', this.props.product.id);
        this.setState({ deleteProductModalActive: false });
        this.props.reload();
    }

    loadImage = () => {
        const url = "https://i.imgur.com/" + this.props.product.imgPath + ".jpg";
        return <img className="product-image-rendering" alt="" src={url} />
    }

    render() {
        return (
            <div onMouseEnter={this.expandContent} onMouseLeave={this.minifyContent} className="product-card-container">
                <Modal className="update-product-modal" open={this.state.updateProductModalActive}>
                    <Modal.Header>Edit Product</Modal.Header>
                    <Modal.Content>
                        <Modal.Description className="product-inputs">
                            <Input className="update-name-input" type="text" value={this.state.newProductName} placeholder='Name' onChange={(e, data) => this.setState({ newProductName: data.value })} />
                            <Input className="update-email-input" type="email" value={this.state.newProductEmail} placeholder='Email' onChange={(e, data) => this.setState({ newProductEmail: data.value })} />
                            <Input className="update-password-input" type="password" placeholder='Password' value={this.state.newProductPassword} onChange={(e, data) => this.setState({ newProductPassword: data.value })} />
                        </Modal.Description>
                        <Button onClick={this.updateProduct}>Update</Button>
                        <Button onClick={() => this.setState({ updateProductModalActive: false })}>Cancel</Button>
                    </Modal.Content>
                </Modal>
                <Modal className="delete-product-modal" open={this.state.deleteProductModalActive}>
                    <Modal.Header>Delete Product</Modal.Header>
                    <Modal.Content>
                        <Modal.Description className="product-delete">
                            Are you sure to delete <b>{this.props.product.name}</b>?
                        </Modal.Description>
                        <Button onClick={this.deleteProduct}>Delete</Button>
                        <Button onClick={() => this.setState({ deleteProductModalActive: false })}>Cancel</Button>
                    </Modal.Content>
                </Modal>
                <div className="product-image">{this.loadImage()}</div>
                <div className='product-name'>{this.props.product.name}</div>
                <Button className="product-edit-button" onClick={() => this.setState({ updateProductModalActive: true })}><FontAwesomeIcon icon={faPen} /></Button>
                <Button className="product-delete-button" onClick={() => this.setState({ deleteProductModalActive: true })}><FontAwesomeIcon icon={faTrash} /></Button>
            </div>
        );
    }
}