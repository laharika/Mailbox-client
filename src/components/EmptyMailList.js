import React, { Component } from 'react';

export default class EmptyMailList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div className="empty-selection alert alert-warning" role="alert">
            <span>No {this.props.text} to display.</span>
          </div>
        );
    }
}