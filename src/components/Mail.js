import React, { Component } from 'react';
import axios from 'axios';

export default class Mail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: ''
        };
    }

    componentWillMount() {

        const payload = {
            id : this.props.id
        }

        // To fetch the corresponding mail thread
        axios({
            method: 'post',
            url: 'http://localhost:8080/getmailbyid',
            data: payload
        })
        .then(res => {

            this.setState({
                body: res.data.data
            });
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            const payload = {
                id : this.props.id
            }

            // To fetch the corresponding mail thread
            axios({
                method: 'post',
                url: 'http://localhost:8080/getmailbyid',
                data: payload
            })
            .then(res => {
                console.log(res)
                this.setState({
                    body: res.data.data
                });
            })
        }
    }
    render() {

        return (
          <div className="mail">
            <dl className="meta dl-horizontal">
              <dt>From</dt>
              <dd>{this.props.from}</dd>

              <dt>To</dt>
              <dd>{this.props.to}</dd>

              <dt>Subject</dt>
              <dd>{this.props.subject}</dd>
            </dl>
            <div className="body" dangerouslySetInnerHTML={{__html: this.state.body}}></div>
          </div>
        );
    }
}