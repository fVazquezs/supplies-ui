import React from 'react';
import UserCard from './UserCard.js';
import Supplies from '../../api/Supplies.js';
import { Modal, Input, Button, Dropdown } from 'semantic-ui-react';
import "./Users.css";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bearerToken: null, displayUsers: [], users: [], departments: [], newUserModalActive: false, updateUserModalActive: null, newUserName: null, newUserEmail: null, newUserPassword: null, newUserDepartment: null };
        this.suppliesDataService = new Supplies();
        this.displayUsers = [];
        this.loadDataService();
    }

    loadDataService = async () => {
        const users = await this.suppliesDataService.load('users');
        const departments = await this.suppliesDataService.load('departments');
        this.setState({ displayUsers: users, users, departments })

    }

    createNewUser = async () => {
        await this.suppliesDataService.create('users', {
            "name": this.state.newUserName,
            "email": this.state.newUserEmail,
            "password": this.state.newUserPassword,
            "departmentId": this.state.newUserDepartment
        })
        this.setState({ newUserModalActive: false })
        this.loadDataService();
    }

    filterUsers = data => {
        if (data === '') {
            this.setState({ displayUsers: this.state.users })
        } else {
            this.setState({
                displayUsers: this.state.users.filter(function (user) {
                    return user.name.includes(data);
                })
            })
        }
    }

    renderUsers = () => {
        var users = null;
        if (this.state.displayUsers !== null) {
            users = this.state.displayUsers.map(user => {
                return <UserCard key={user.id} user={user} departments={this.state.departments} reload={this.loadDataService} />
            });
        }
        return <div className="user-list" > {users} </div>
    }

    newUserModal = () => {
        return (
            <Modal className="new-user-modal" open={this.state.newUserModalActive}>
                <Modal.Header>New User</Modal.Header>
                <Modal.Content>
                    <Modal.Description className="user-inputs">
                        <Input className="new-name-input" placeholder='Name' onChange={(event, data) => this.setState({ newUserName: data.value })} />
                        <Input className="new-email-input" placeholder='Email' onChange={(event, data) => this.setState({ newUserEmail: data.value })} />
                        <Input className="new-password-input" type="password" placeholder='Password' onChange={(event, data) => this.setState({ newUserPassword: data.value })} />
                        <Dropdown className="new-department-dropdown" placeholder="Select department" search selection
                            onChange={(event, data) => this.setState({ newUserDepartment: data.value })}
                            options={this.state.departments.map(department => {
                                return {
                                    key: department.id,
                                    text: department.name,
                                    value: department.id
                                }
                            })} />
                    </Modal.Description>
                    <Button onClick={this.createNewUser}>Create</Button>
                    <Button onClick={() => this.setState({ newUserModalActive: false })}>Cancel</Button>
                </Modal.Content>
            </Modal>
        )
    }

    updateUserModal = () => {
        return (
            <Modal className="new-user-modal" open={this.state.updateUserModalActive}>
                <Modal.Header>Login</Modal.Header>
                <Modal.Content>
                    <Modal.Description className="user-inputs">
                        <Input className="name-input" placeholder='Name' onChange={(event, data) => this.setState({ newUserName: data.value })} />
                        <Input className="email-input" placeholder='Email' onChange={(event, data) => this.setState({ newUserEmail: data.value })} />
                        <Input className="password-input" placeholder='Password' onChange={(event, data) => this.setState({ newUserPassword: data.value })} />
                        <Dropdown placeholder="Select department" search selection
                            onChange={(event, data) => this.setState({ newUserDepartment: data.value })}
                            options={this.state.departments.map(department => {
                                return {
                                    key: department.id,
                                    text: department.name,
                                    value: department.id
                                }
                            })} />
                    </Modal.Description>
                    <Button onClick={this.createNewUser}>Create</Button>
                    <Button onClick={() => this.setState({ newUserModalActive: false })}>Cancel</Button>
                </Modal.Content>
            </Modal>
        )
    }

    render() {
        return (
            <div className="master">
                {this.newUserModal()}
                {this.updateUserModal()}
                <div className="user-header">
                    <Input className="user-filter" onChange={(e, data) => this.filterUsers(data.value)} />
                    <Button className="new-user-button" onClick={() => this.setState({ newUserModalActive: true })}>New</Button>
                </div>
                {this.renderUsers()}
            </div>
        );
    }
}