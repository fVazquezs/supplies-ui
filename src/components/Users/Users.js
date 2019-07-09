import React from 'react';
import UserCard from './UserCard.js';
import Supplies from '../../api/Supplies.js';
import { Modal, Input, Button, Dropdown } from 'semantic-ui-react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bearerToken: null, users: [], departments: [], newUserModalActive: false, updateUserModalActive: null, newUserName: null, newUserEmail: null, newUserPassword: null, newUserDepartment: null };
        this.suppliesDataService = new Supplies();
        this.loadDataService();
    }

    loadDataService = async () => {
        const users = await this.suppliesDataService.loadUsers();
        const departments = await this.suppliesDataService.loadDepartments();
        console.log(departments)
        this.setState({ users: users, departments: departments })
    }

    createNewUser = () => {
        this.suppliesDataService.createUser({
            "name": this.state.newUserName,
            "email": this.state.newUserEmail,
            "password": this.state.newUserPassword,
            "departmentId": this.state.newUserDepartment
        })
        this.setState({ newUserModalActive: false })
        console.log(this.state)
    }

    renderUsers = () => {
        var users = null;
        if (this.state.users !== null) {
            users = this.state.users.map(user => {
                return <UserCard key={user.id} user={user} departments={this.state.departments} />
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
                <Button onClick={() => this.setState({ newUserModalActive: true })}>New</Button>
                {this.renderUsers()}
            </div>
        );
    }
}