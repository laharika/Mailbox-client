import React, { Component } from 'react';
import deleteIcon from '../images/delete-icon.png';
import spamIcon from '../images/spam-icon.png';
import viewIcon from '../images/view-icon.png';
import inboxIcon from '../images/mail-inbox-icon.png';
import replyIcon from '../images/reply-icon.png';

let temp_mail = {
    id: 0,
    from:'',
    to:'',
    subject:''
}

export default class MailItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail:[]
        }

    }

    componentWillMount() {
        temp_mail.id = this.props.id;
        temp_mail.from =this.props.from;
        temp_mail.to = this.props.to;
        temp_mail.subject = this.props.subject;

        this.setState({mail: temp_mail});
    }

    render() {

        var buttons = null;
        if(this.props.category == "inbox") {
            buttons = <div>
                <button onClick={this.props.on_click.bind(null, this.props.id)}><img className="icons" src={viewIcon} alt=""/></button>
                <button onClick={this.props.onChangeCategory.bind(null,this.props.id,"spam")}><img className="icons" src={spamIcon} alt=""/></button>
                <button onClick={this.props.onChangeCategory.bind(null,this.props.id,"deleted")}><img className="icons" src={deleteIcon} alt=""/></button>
                <button ><img className="icons" src={replyIcon} onClick={this.props.onReply.bind(null,this.state.mail)} alt=""/></button>
                </div>

        }
        else if(this.props.category == "spam") {
            buttons =<div>
                <button onClick={this.props.on_click.bind(null, this.props.id)}><img className="icons" src={viewIcon} alt=""/></button>
                <button onClick={this.props.onChangeCategory.bind(null,this.props.id,"inbox")}><img className="icons" src={inboxIcon} alt=""/></button>
                <button onClick={this.props.onChangeCategory.bind(null,this.props.id,"deleted")}><img className="icons" src={deleteIcon} alt=""/></button>
                <button ><img className="icons" src={replyIcon} onClick={this.props.onReply.bind(null,this.state.mail)} alt=""/></button>
                </div>

        }
        else if(this.props.category == "deleted") {
            buttons =<div>
                <button onClick={this.props.on_click.bind(null, this.props.id)}><img className="icons" src={viewIcon} alt=""/></button>
                <button onClick={this.props.onChangeCategory.bind(null,this.props.id,"inbox")}><img className="icons" src={inboxIcon} alt=""/></button>
                <button ><img className="icons" src={replyIcon} onClick={this.props.onReply.bind(null,this.state.mail)} alt=""/></button>
                </div>

        }
        return (
          <tr className = {this.props.currentId == this.props.id ? "current-mail" : ""} >
            <td>{this.props.from}</td>
            <td>{this.props.subject}</td>
            <td>
                {buttons}
            </td>
          </tr>
        );

    }
}