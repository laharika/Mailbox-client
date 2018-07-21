import React, { Component } from 'react';

export default class MailItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <tr className = {this.props.currentId == this.props.id ? "current-mail" : ""} onClick={this.props.on_click.bind(null, this.props.id)}>
            <td>{this.props.from}</td>
            <td>{this.props.subject}</td>
          </tr>
        );

    }
}