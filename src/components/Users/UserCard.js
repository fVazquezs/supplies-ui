import React from 'react';
import './UserCard.css';

export default class extends React.Component {
    render() {
        return (
            <div className="user-card-container">
                <div className="user-image"></div>
                <div className='user-name'>{this.props.user.name}</div>
            </div>
        );
    }
}