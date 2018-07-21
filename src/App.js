import React, { Component } from 'react';
import CategoryList from './components/CategoryList';
import Category from './components/Category';
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name : "inbox",
            currentSelection : 1
        };
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
    }

    handleSelectCategory = (category) => {
        this.setState({
                    category_name: category.category_name,
                    currentSelection: category.category_id
         });
    }

    render() {
       var category_name = this.state.category_name;
       var selected_category = <Category category={category_name}
                                     mails={this.props.mails} />;

       return (
        <div className="app row">
            <CategoryList categories={this.props.categories}
                         currentSelection = {this.state.currentSelection}
                         onSelectCategory={this.handleSelectCategory} />
            <div className="category-box col-md-10">
              <div className="panel panel-default">
                <div className="panel-body">
                  {selected_category}
                </div>
              </div>
            </div>
        </div>
       );

    }


}