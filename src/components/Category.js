import React, { Component } from 'react';
import EmptyMailList from '../components/EmptyMailList';
import Mails from '../components/Mails';
import Mail from '../components/Mail';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_id: null,
            refreshStates : 0,
            mails: []
        };
    }

    //sets email_id to null after category change
    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this.setState({email_id:null
            });
        }
        if(this.props.refreshStates !== prevProps.refreshStates) {
            this.setState({email_id:null})
        }
    }
    handleSelectEmail = (id) => {

        this.setState({ email_id: id,
            refreshStates : 1
        });
    }

    render() {
        var email_id = this.state.email_id;
        var selected_email;
        if (email_id ) {
          var mail = this.props.mails.filter(function(mail) {
            return mail.id == email_id;
          })[0];
          selected_email = <Mail id={this.props.email_id}
                                  from={mail.from}
                                  to={mail.to}
                                  subject={mail.subject}
                                  body={mail.body}
                                  refreshStates={this.state.refreshStates}/>;
        }

        return (
          <div>
            <Mails emails={this.props.mails}
                       currentMailId = {this.state.email_id}
                       category={this.props.category}
                       refreshStates={this.state.refreshStates}
                       onSelectEmail={this.handleSelectEmail}
                       onReply={this.props.onReply.bind(this)}
                       onChangeCategory={this.props.onChangeCategory.bind(this)}/>
            <div className="email-viewer">
              {selected_email}
            </div>
          </div>
        );
    }
}
