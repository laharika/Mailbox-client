import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

var categories = [
    {
        category_id: 1,
        category_name: "inbox"
    },
    {
        category_id: 2,
        category_name: "spam"
    },
    {
        category_id: 3,
        category_name: "deleted"
    }
]

ReactDOM.render(
    <App categories={categories}/>,
    document.getElementById('root'));
