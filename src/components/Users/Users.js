import React from 'react';
import UserCard from './UserCard.js';
import Supplies from '../../api/Supplies.js';
import { Modal, Input, Button, Dropdown } from 'semantic-ui-react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bearerToken: null, users: [], departments: [], newUserModalActive: false, newUserEmail: null, newUserPassword: null, newUserDepartment: null };
        this.suppliesDataService = new Supplies();
        this.loadDataService();
    }

    loadDataService = async () => {
        const users = await this.suppliesDataService.loadUsers();
        const departments = await this.suppliesDataService.loadDepartments();
        this.setState({ users: users, departments: departments })
    }

    renderUsers = () => {
        var users = null;
        if (this.state.users !== null) {
            users = this.state.users.map(user => {
                return <UserCard key={user.id} user={user} />
            });
        }
        return <div className="user-list" > {users} </div>
    }

    createNewUser = () =>{
        console.log(this.state)
    }
    render() {
        return (
            <div className="master">
                <Modal className="new-user-modal" open={this.state.newUserModalActive}>
                    <Modal.Header>Login</Modal.Header>
                    <Modal.Content>
                        <Modal.Description className="user-inputs">
                            <Input className="email-input" placeholder='Email' onChange={(event, data) => this.setState({ newUserEmail: data.value })} />
                            <Input className="password-input" placeholder='Password' onChange={(event, data) => this.setState({ newUserPassword: data.value })} />
                            <Dropdown placeholder="Select department" search selection
                                onChange={(event, data) => this.setState({ newUserDepartment: data.value })}
                                options={() => this.state.departments.map(department => {})
                                    [
                                    {
                                        key: 'Justen Kitsune',
                                        text: 'Justen Kitsune',
                                        value: 'Justen Kitsune',
                                    }, {
                                        key: 'Kitsune',
                                        text: 'Kitsune',
                                        value: 'Kitsune',
                                    }
                                ]} />
                        </Modal.Description>
                        <Button onClick={this.createNewUser}>Create</Button>
                        <Button onClick={() => this.setState({ newUserModalActive: false })}>Cancel</Button>
                    </Modal.Content>
                </Modal>
                <Button onClick={() => this.setState({ newUserModalActive: true })}>New</Button>
                {this.renderUsers()}
            </div>
        );
    }
}