import React, { Component } from 'react';
import EmptyMailList from '../components/EmptyMailList';
import Mails from '../components/Mails';
import Mail from '../components/Mail';
//import MailboxStyle from '../css/MailboxStyle.css.js';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_id: null
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this.setState({email_id:null});
          }
    }
    handleSelectEmail = (id) => {
        this.setState({ email_id: id });
    }

    render() {
        var email_id = this.state.email_id;
        var selected_email;
        if (email_id ) {
          var mail = this.props.mails.filter(function(mail) {
            return mail.id == email_id;
          })[0];
          selected_email = <Mail id={mail.id}
                                  from={mail.from}
                                  to={mail.to}
                                  subject={mail.subject}
                                  body={mail.body} />;
        } else {

          selected_email = <EmptyMailList text="email" />;
        }

        return (
          <div>
            <Mails emails={this.props.mails}
                       currentMailId = {this.state.email_id}
                       category={this.props.category}
                       onSelectEmail={this.handleSelectEmail} />
            <div className="email-viewer">
              {selected_email}
            </div>
          </div>
        );
    }
}
