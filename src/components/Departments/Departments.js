import React from 'react';
import DepartmentCard from './DepartmentCard.js';
import Supplies from '../../api/Supplies.js';
import { Modal, Input, Button } from 'semantic-ui-react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bearerToken: null, departments: [], newDepartmentModalActive: false, newDepartmentName: null };
        this.suppliesDataService = new Supplies();
        this.loadDataService();
    }

    loadDataService = async () => {
        const departments = await this.suppliesDataService.loadDepartments();
        console.log(departments)
        this.setState({ departments: departments })
    }

    renderDepartments = () => {
        var departments = null;
        if (this.state.departments !== null) {
            departments = this.state.departments.map(department => {
                return <DepartmentCard key={department.id} department={department} />
            });
        }
        return <div className="department-list" > {departments} </div>
    }

    createNewDepartment = () => {
        this.suppliesDataService.createDepartment({
            "name": this.state.newDepartmentName
        })
        this.setState({ newDepartmentModalActive: false })
    }
    render() {
        return (
            <div className="master">
                <Modal className="new-department-modal" open={this.state.newDepartmentModalActive}>
                    <Modal.Header>Login</Modal.Header>
                    <Modal.Content>
                        <Modal.Description className="department-inputs">
                            <Input className="name-input" placeholder='Name' onChange={(event, data) => this.setState({ newDepartmentName: data.value })} />
                        </Modal.Description>
                        <Button onClick={this.createNewDepartment}>Create</Button>
                        <Button onClick={() => this.setState({ newDepartmentModalActive: false })}>Cancel</Button>
                    </Modal.Content>
                </Modal>
                <Button onClick={() => this.setState({ newDepartmentModalActive: true })}>New</Button>
                {this.renderDepartments()}
            </div>
        );
    }
}