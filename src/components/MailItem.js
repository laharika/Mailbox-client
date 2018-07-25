import React, { Component } from 'react';
import deleteIcon from '../images/delete-icon.png';
import spamIcon from '../images/spam-icon.png';
import viewIcon from '../images/view-icon.png';
import inboxIcon from '../images/mail-inbox-icon.png';
import replyIcon from '../images/reply-icon.png';

export default class MailItem extends Component {
    constructor(props) {
        super(props);


    }

    render() {

        var buttons = null;
        if(this.props.category == "inbox") {
            buttons = <div>
                <button onClick={this.props.on_click.bind(null, this.props.id)}><img className="icons" src={viewIcon}/></button>
                <button onClick={this.props.onChangeCategory.bind(null,this.props.id,"spam")}><img className="icons" src={spamIcon}/></button>
                <button onClick={this.props.onChangeCategory.bind(null,this.props.id,"deleted")}><img className="icons" src={deleteIcon}/></button>
                <button ><img className="icons" src={replyIcon} onClick={this.props.onReply.bind(null,this.props.id)}/></button>
                </div>

        }
        else if(this.props.category == "spam") {
            buttons =<div>
                <button onClick={this.props.on_click.bind(null, this.props.id)}><img className="icons" src={viewIcon}/></button>
                <button onClick={this.props.onChangeCategory.bind(null,this.props.id,"inbox")}><img className="icons" src={inboxIcon}/></button>
                <button onClick={this.props.onChangeCategory.bind(null,this.props.id,"deleted")}><img className="icons" src={deleteIcon}/></button>
                <button ><img className="icons" src={replyIcon} onClick={this.props.onReply.bind(null,this.props.id)}/></button>
                </div>

        }
        else if(this.props.category == "deleted") {
            buttons =<div>
                <button onClick={this.props.on_click.bind(null, this.props.id)}><img className="icons" src={viewIcon}/></button>
                <button onClick={this.props.onChangeCategory.bind(null,this.props.id,"inbox")}><img className="icons" src={inboxIcon}/></button>
                <button ><img className="icons" src={replyIcon} onClick={this.props.onReply.bind(null,this.props.id)}/></button>
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