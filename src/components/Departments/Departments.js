import "./Departments.css";
import React from 'react';
import DepartmentCard from './DepartmentCard.js';
import Supplies from '../../api/Supplies.js';
import { Modal, Input, Button } from 'semantic-ui-react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bearerToken: null, displayDepartments: [], departments: [], newDepartmentModalActive: false, newDepartmentName: null };
        this.suppliesDataService = new Supplies();
        this.loadDataService();
    }

    loadDataService = async () => {
        const departments = await this.suppliesDataService.load('departments');
        this.setState({ displayDepartments: departments, departments })
    }

    renderDepartments = () => {
        var departments = null;
        if (this.state.displayDepartments !== null) {
            departments = this.state.displayDepartments.map(department => {
                return <DepartmentCard key={department.id} department={department} reload={this.loadDataService} />
            });
        }
        return <div className="department-list" > {departments} </div>
    }

    createNewDepartment = async () => {
        await this.suppliesDataService.create('departments', {
            "name": this.state.newDepartmentName
        })
        this.setState({ newDepartmentModalActive: false });
        this.loadDataService();
    }

    filterDepartments = data =>{
        if (data === '') {
            this.setState({ displayDepartments: this.state.departments })
        } else {
            this.setState({
                displayDepartments: this.state.departments.filter(function (department) {
                    return department.name.includes(data);
                })
            })
        }
    }

    render() {
        return (
            <div className="master">
                <Modal className="new-department-modal" open={this.state.newDepartmentModalActive}>
                    <Modal.Header>Login</Modal.Header>
                    <Modal.Content>
                        <Modal.Description className="department-inputs">
                            <Input className="new-department-input" placeholder='Name' onChange={(event, data) => this.setState({ newDepartmentName: data.value })} />
                        </Modal.Description>
                        <Button onClick={this.createNewDepartment}>Create</Button>
                        <Button onClick={() => this.setState({ newDepartmentModalActive: false })}>Cancel</Button>
                    </Modal.Content>
                </Modal>
                <div className="department-header">
                    <Input className="department-filter" placeholder="Search department" onChange={(e, data) => this.filterDepartments(data.value)} />
                    <Button className="new-department-button" onClick={() => this.setState({ newDepartmentModalActive: true })}>New</Button>
                </div>
                {this.renderDepartments()}
            </div>
        );
    }
}