import React, { Component } from 'react';

export default class Mail extends Component {
    constructor(props) {
        super(props);
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
            <div className="body" dangerouslySetInnerHTML={{__html: this.props.body}}></div>
          </div>
        );
    }
}