import React, { Component } from 'react';
import CategoryList from './components/CategoryList';
import Category from './components/Category';
import './App.css';
import axios from 'axios';
import Modal from 'react-modal';

import Search from './components/Search';

Modal.setAppElement('#root');

let temp_body = '';

let temp_mail = {
    id :0,
    to:'',
    from:'',
    subject:'',
    mail_type:'',
    reply_id:''
};
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name : "inbox",
            currentSelection : 1,
            mails: [],
            refreshStates: 0,
            visible: false,
            replymail: [],
            new_body: "Enter Email content here!"
        };
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleReply = this.handleReply.bind(this);
        this.changeBody = this.changeBody.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount(){

        axios({
            method: 'post',
            url: 'http://localhost:8080/getallmails'

        })
        .then(res => {
            this.setState({
                mails: res.data.data
            });
        })
    }

    refresh = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/getallmails'

        })
        .then(res => {

            this.setState({
                mails: res.data.data
            });

        })
    }


    handleSelectCategory = (category) => {

        this.setState({
                    category_name: category.category_name,
                    currentSelection: category.category_id
         });
    }

    handleChangeCategory = (id,category_name) => {
            const payload = {
                id: id,
                mail_type: category_name
            }
            axios({
                method: 'post',
                url: 'http://localhost:8080/changecategory',
                data: payload
            })
            .then( res => {
                this.setState({ refreshStates : !this.state.refreshStates})
                this.hide();
                this.refresh();
            })
    }

    handleSubmitReply = () => {
        const payload = {
            id: this.state.replymail.id,
            body: this.state.new_body
        }
        axios({
            method: 'post',
            url: 'http://localhost:8080/addreply',
            data: payload
        })
        .then( res => {
            this.setState({ refreshStates : !this.state.refreshStates})
            this.hide();
            this.refresh();
        })
    }

    hide = () => {
        this.setState({  visible: false});
    };

    show = () => {
        this.setState({  visible: true});
    };

    handleReply = (mail) => {
        this.setState({
            replymail: mail
        });

        this.show();
    }

    changeBody(e) {
        temp_body = e.target.value;
        this.setState({
            new_body: temp_body
        });
    }

    handleSearch = (category, searchword) => {
        const payload = {
            mail_type: category,
            search_text: searchword
        }
        axios({
            method: 'post',
            url: 'http://localhost:8080/searchmails',
            data: payload
        })
        .then( res => {
            temp_mail = res.data.data
            this.setState({ mails: temp_mail})

        })

    }
    render() {
       var submitButton = <button onClick={this.handleSubmitReply}>Submit</button>
       var cancelButton = <button onClick={this.hide}>Cancel</button>
       return (
        <div className="app row">
            <Modal
            isOpen={this.state.visible}
            contentLabel="Minimal Modal Example"
            style={
                {
                    overlay: {
                        zIndex: 2,
                        width: '100%'

                    }
                }
            }
            >
                <table className="reply-form">
                    <tbody>
                    <tr>
                        <td className="reply-form-td"><label htmlFor="label_to"><b>To</b></label></td>
                        <td className="reply-form-td">{this.state.replymail.from}</td>
                    </tr>
                    <tr>
                        <td className="reply-form-td"><label htmlFor="label_from"><b>From</b></label></td>
                        <td className="reply-form-td">{this.state.replymail.to}</td>
                    </tr>
                    <tr>
                        <td className="reply-form-td"><label htmlFor="label_subject"><b>Subject</b></label></td>
                        <td className="reply-form-td">{this.state.replymail.subject}</td>
                    </tr>
                    </tbody>

                </table>
                <textarea cols="100" rows="10" value={this.state.new_body} onChange={this.changeBody} />
                <div className="reply-form-buttons">{submitButton}{cancelButton}</div>
            </Modal>
            <CategoryList categories={this.props.categories}
                 currentSelection = {this.state.currentSelection}
                 onSelectCategory={this.handleSelectCategory}
             />
            <div className="category-box col-md-10">
              <div className="panel panel-default">
                <div className="panel-body">
                    <Search category={this.category_name} onSearch={this.handleSearch}/>
                    <Category
                        category={this.state.category_name} mails={this.state.mails}
                        onChangeCategory={this.handleChangeCategory}  onReply={this.handleReply} refreshStates = {this.state.refreshStates}
                    />
                </div>
              </div>
            </div>
        </div>
       );

    }


}