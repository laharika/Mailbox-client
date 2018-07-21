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
var mails =  [{
                 id: 1,
                 subject: 'Sample Mail',
                 to: 'utkarsh@effy.co.in',
                 from: 'senthil@effy.co.in',
                 type: 'inbox',
                 body: '<div style="font-weight:bold;">Hi!<br/>Do you have the document I asked for?',
                 reply_id: 2
               },
                 {
                   id: 2,
                   subject: 'Sample Mail',
                   to: 'senthil@effy.co.in',
                   from: 'utkarsh@effy.co.in',
                   type: 'inbox',
                   body: 'Hi! Yes, I\'ll mail you the same separately'
                 }
               ];
ReactDOM.render(
    <App
        mails={mails}
        categories={categories}
    />,
    document.getElementById('root'));
