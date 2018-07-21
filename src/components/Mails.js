import React, { Component } from 'react';
import MailItem from '../components/MailItem';

export default class Mails extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        var email_list = this.props.emails.map(function(mail) {
          if(mail.type == this.props.category) {
              return (

                    <MailItem key={mail.id}
                               currentId = {this.props.currentMailId}
                               id = {mail.id}
                               from={mail.from}
                               subject={mail.subject}
                               on_click={this.props.onSelectEmail.bind(null, mail.id)} />
              );
          }
        }.bind(this));

        return (
          <table className="email-list table table-condensed">
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>


              </tr>
            </thead>
            <tbody>
              {email_list}
            </tbody>
          </table>
        );
    }
}