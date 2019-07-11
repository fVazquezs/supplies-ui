import React from 'react';
import './DepartmentCard.css';
import { Modal, Input, Button } from 'semantic-ui-react';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Supplies from '../../api/Supplies';

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updateDepartmentModalActive: false,
            newDepartmentName: this.props.department.name,
            deleteDepartmentModalActive: false
        }
        this.suppliesDataService = new Supplies();
    }

    updateDepartment = async () => {
        await this.suppliesDataService.update('departments', this.props.department.id, {
            "id": this.props.department.id,
            "name": this.state.newDepartmentName
        });
        this.setState({ updateDepartmentModalActive: false });
        this.props.reload();
    }

    deleteDepartment = async () => {
        await this.suppliesDataService.delete('departments', this.props.department.id);
        this.setState({ deleteDepartmentModalActive: false });
        this.props.reload();
    }

    render() {
        return (
            <div className="department-card-container">
                <Modal className="update-department-modal" open={this.state.updateDepartmentModalActive}>
                    <Modal.Header>Edit Department</Modal.Header>
                    <Modal.Content>
                        <Modal.Description className="department-inputs">
                            <Input className="name-input" type="text" value={this.state.newDepartmentName} placeholder='Name' onChange={(e, data) => this.setState({ newDepartmentName: data.value })} />
                        </Modal.Description>
                        <Button onClick={this.updateDepartment}>Update</Button>
                        <Button onClick={() => this.setState({ updateDepartmentModalActive: false })}>Cancel</Button>
                    </Modal.Content>
                </Modal>
                <Modal className="delete-department-modal" open={this.state.deleteDepartmentModalActive}>
                    <Modal.Header>Delete Department</Modal.Header>
                    <Modal.Content>
                        <Modal.Description className="department-inputs">
                            Are you sure to delete {this.props.department.name}?
                        </Modal.Description>
                        <Button onClick={this.deleteDepartment}>Delete</Button>
                        <Button onClick={() => this.setState({ deleteDepartmentModalActive: false })}>Cancel</Button>
                    </Modal.Content>
                </Modal>
                <div className="department-name">{this.props.department.name}</div>
                <div className='department-department'>{this.props.department.departmentId}</div>
                <Button onClick={() => this.setState({ updateDepartmentModalActive: true })}><FontAwesomeIcon icon={faPen} /></Button>
                <Button onClick={() => this.setState({ deleteDepartmentModalActive: true })}><FontAwesomeIcon icon={faTrash} /></Button>
            </div>
        );
    }
}