import React from 'react';
import './UserCard.css';
import { Modal, Input, Button, Dropdown } from 'semantic-ui-react';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Supplies from '../../api/Supplies';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            updateUserModalActive: false,
            deleteUserModalActive: false,
            newUserName: this.props.user.name,
            newUserEmail: this.props.user.email,
            newUserPassword: this.props.user.password,
            newUserDepartment: this.props.user.departmentId
        })
        this.suppliesDataService = new Supplies();
    }

    updateUser = async () => {
        await this.suppliesDataService.update('users', this.props.user.id, {
            "name": this.state.newUserName,
            "email": this.state.newUserEmail,
            "password": this.state.newUserPassword,
            "departmentId": this.state.newUserDepartment
        });
        this.setState({ updateUserModalActive: false });
        this.props.reload();
    }

    deleteUser = async () => {
        await this.suppliesDataService.delete('users', this.props.user.id);
        this.setState({ deleteUserModalActive: false });
        this.props.reload();
    }
    render() {
        return (
            <div className="user-card-container">
                <Modal className="update-user-modal" open={this.state.updateUserModalActive}>
                    <Modal.Header>Edit User</Modal.Header>
                    <Modal.Content>
                        <Modal.Description className="user-inputs">
                            <Input className="update-name-input" type="text" value={this.state.newUserName} placeholder='Name' onChange={(e, data) => this.setState({ newUserName: data.value })} />
                            <Input className="update-email-input" type="email" value={this.state.newUserEmail} placeholder='Email' onChange={(e, data) => this.setState({ newUserEmail: data.value })} />
                            <Input className="update-password-input" type="password" placeholder='Password' value={this.state.newUserPassword} onChange={(e, data) => this.setState({ newUserPassword: data.value })} />
                            <Dropdown className="update-department-dropdown" value={this.state.newUserDepartment} placeholder="Select department" selection
                                onChange={(e, data) => this.setState({ newUserDepartment: data.value })}
                                options={this.props.departments.map(department => {
                                    return {
                                        key: department.id,
                                        text: department.name,
                                        value: department.id
                                    }
                                })} />
                        </Modal.Description>
                        <Button onClick={this.updateUser}>Update</Button>
                        <Button onClick={() => this.setState({ updateUserModalActive: false })}>Cancel</Button>
                    </Modal.Content>
                </Modal>
                <Modal className="delete-user-modal" open={this.state.deleteUserModalActive}>
                    <Modal.Header>Delete User</Modal.Header>
                    <Modal.Content>
                        <Modal.Description className="user-delete">
                            Are you sure to delete <b>{this.props.user.name}</b>?
                        </Modal.Description>
                        <Button onClick={this.deleteUser}>Delete</Button>
                        <Button onClick={() => this.setState({ deleteUserModalActive: false })}>Cancel</Button>
                    </Modal.Content>
                </Modal>
                <div className="user-name"><b>{this.props.user.name}</b></div>
                <div className='user-department'><b>{this.props.user.departmentId}</b></div>
                <Button className="user-edit-button" onClick={() => this.setState({ updateUserModalActive: true })}><FontAwesomeIcon icon={faPen} /></Button>
                <Button className="user-delete-button" onClick={() => this.setState({ deleteUserModalActive: true })}><FontAwesomeIcon icon={faTrash} /></Button>
            </div>
        );
    }
}