import React, { Component } from 'react';

export default class CategoryList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        var category_list = this.props.categories.map(function(category) {
        return (

        <li className={this.props.currentSelection == category.category_id ? "list-group-item active" : "list-group-item"}
            key={category.category_id}
            onClick={this.props.onSelectCategory.bind(null, category)}>
            {category.category_name}
        </li>
        );
        }.bind(this));

        return (
        <div className="col-md-2">
        <ul className="category-boxes list-group">
          {category_list}
        </ul>
        </div>
        );
    }

}