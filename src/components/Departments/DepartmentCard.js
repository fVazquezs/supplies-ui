import React from 'react';
import './DepartmentCard.css';
import { Modal, Input, Button } from 'semantic-ui-react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Supplies from '../../api/Supplies';

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updateDepartmentModalActive: false,
            newDepartmentName: this.props.department.name
        }
        console.log(props)
        this.suppliesDataService = new Supplies();
    }

    updateDepartment=()=> {
        this.suppliesDataService.updateDepartment(this.props.department.id,{
            "id": this.props.department.id,
            "name": this.state.newDepartmentName
        });
        this.setState({ updateDepartmentModalActive: false })
    }

    render() {
        return (
            <div className="department-card-container">
                <Modal className="new-department-modal" open={this.state.updateDepartmentModalActive}>
                    <Modal.Header>Edit Department</Modal.Header>
                    <Modal.Content>
                        <Modal.Description className="department-inputs">
                            <Input className="name-input" type="text" value={this.state.newDepartmentName} placeholder='Name' onChange={(e, data) => this.setState({ newDepartmentName: data.value })} />
                        </Modal.Description>
                        <Button onClick={this.updateDepartment}>Create</Button>
                        <Button onClick={() => this.setState({ updateDepartmentModalActive: false })}>Cancel</Button>
                    </Modal.Content>
                </Modal>
                <div className="department-name">{this.props.department.name}</div>
                <div className='department-department'>{this.props.department.departmentId}</div>
                <Button onClick={() => this.setState({ updateDepartmentModalActive: true })}><FontAwesomeIcon icon={faPen} /></Button>
            </div>
        );
    }
}