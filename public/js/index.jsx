import { Component } from 'react';
import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Hello extends Component {

  constructor () {
    super();

    this.state = {
      liked: false,
      num: 0
    };

    this.socket = io.connect(location.origin.replace(/^http/, 'ws'));

    this.socket.on('chat message', (data) => {
      var num = this.state.num + 1;

      this.setState({ num });
    });

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState({liked: !this.state.liked});
    this.socket.emit('chat message', 'user ' + (this.state.liked ? 'likes' : 'dislikes') + ' this page.');
  }

  render () {
    var text = this.state.liked ? 'like' : 'dislike';

    return (
      <div id="indexTest">
        <h1>Welcome to sockets</h1>
        <p onClick={this.handleClick}>
          You {text} this. Click to toggle.
        </p>
        <p>There have been {this.state.num} clicks</p>
      </div>
    );
  }
}

ReactDOM.render(<Hello />, document.getElementById('my-app'));