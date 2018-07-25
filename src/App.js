import React, { Component } from 'react';
import {DialogContainer} from 'react-md';
import CategoryList from './components/CategoryList';
import Category from './components/Category';
import './App.css';
import axios from 'axios';
import Modal from 'react-modal';

import Search from './components/Search';

Modal.setAppElement('#root');

let temp_body = '';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name : "inbox",
            currentSelection : 1,
            mails: [],
            refreshStates: 0,
            visible: false,
            replyforid: 0,
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
            console.log(payload);
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
            id: this.state.replyforid,
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

    handleReply = (id) => {
        console.log(id);
        this.setState({
            replyforid: id
        });

        this.show();
    }

    changeBody(e) {
        temp_body = e.target.value;
        this.setState({
            new_body: temp_body
        });
       // console.log(this.state.new_body);

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
            this.setState({ mails: res.data.data})

        })

    }
    render() {
       var submitButton = <button onClick={this.handleSubmitReply}>Submit</button>
       var cancelButton = <button onClick={this.hide}>Cancel</button>


       return (
        <div className="app row">
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

                    <Modal
                      isOpen={this.state.visible}
                      contentLabel="Minimal Modal Example"
                      width="500px"
                   >
                        <label htmlFor="label_to">To</label>
                        <input type="text" name="text_to" value="to_state" readOnly/>
                        <label htmlFor="label_from">From</label>
                        <input type="text" name="text_from" value="from_state" readOnly/>
                        <label htmlFor="label_subject">Subject</label>
                        <input type="text" name="text_subject" value="subject_state" readOnly/>
                        <textarea value={this.state.new_body} onChange={this.changeBody}/>
                        {submitButton}{cancelButton}
                   </Modal>


                </div>
              </div>
            </div>
        </div>
       );

    }


}