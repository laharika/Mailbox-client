import React, { Component } from 'react';
import CategoryList from './components/CategoryList';
import Category from './components/Category';
import './App.css';
import axios from 'axios';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name : "inbox",
            currentSelection : 1,
            mails: [],
            refreshStates: 0
        };
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.refresh = this.refresh.bind(this);

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
                this.refresh();
            })
    }
    render() {

       return (
        <div className="app row">
            <CategoryList categories={this.props.categories}
                         currentSelection = {this.state.currentSelection}
                         onSelectCategory={this.handleSelectCategory}
                         />
            <div className="category-box col-md-10">
              <div className="panel panel-default">
                <div className="panel-body">
                    <Category
                        category={this.state.category_name} mails={this.state.mails}
                        onChangeCategory={this.handleChangeCategory} refreshStates = {this.state.refreshStates}
                    />
                </div>
              </div>
            </div>
        </div>
       );

    }


}