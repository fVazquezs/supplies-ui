import React from 'react';
import './UserCard.css';
import { Modal, Input, Button, Dropdown } from 'semantic-ui-react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class extends React.Component {
    state = {
        updateUserModalActive: false,
        newUserName: this.props.user.name,
        newUserEmail: this.props.user.email,
        newUserPassword: this.props.user.password,
        newUserDepartment: this.props.user.departmentId
    }
    render() {
        return (
            <div className="user-card-container">
                <Modal className="new-user-modal" open={this.state.updateUserModalActive}>
                    <Modal.Header>Edit User</Modal.Header>
                    <Modal.Content>
                        <Modal.Description className="user-inputs">
                            <Input className="name-input" type="text" value={this.state.newUserName} placeholder='Name' onChange={(e, data) => this.setState({ newUserName: data.value })} />
                            <Input className="email-input" type="email" value={this.state.newUserEmail} placeholder='Email' onChange={(e, data) => this.setState({ newUserEmail: data.value })} />
                            <Input className="password-input" placeholder='Password' value={this.state.newUserPassword} onChange={(e, data) => this.setState({ newUserPassword: data.value })} />
                            <Dropdown value={this.state.newUserDepartment} placeholder="Select department" search selection
                                onChange={(e, data) => this.setState({ newUserDepartment: data.value })}
                                options={this.props.departments.map(department => {
                                    return {
                                        key: department.id,
                                        text: department.name,
                                        value: department.id
                                    }
                                })} />
                        </Modal.Description>
                        <Button onClick={this.createNewUser}>Create</Button>
                        <Button onClick={() => this.setState({ updateUserModalActive: false })}>Cancel</Button>
                    </Modal.Content>
                </Modal>
                <div className="user-name">{this.props.user.name}</div>
                <div className='user-department'>{this.props.user.departmentId}</div>
                <Button onClick={() => this.setState({ updateUserModalActive: true })}><FontAwesomeIcon icon={faPen} /></Button>
            </div>
        );
    }
}