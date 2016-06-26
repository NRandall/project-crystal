import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import MessageList from './MessageList';
import Chat from './Chat';
import * as messageActionCreators from './messageAction.js';
import io from 'socket.io-client';
import TimerMixin from 'react-timer-mixin';

let socket = io.connect();
socket.on('connect', () =>
   socket.emit('room', 4) // 4 should be coupleId
);
class ChatCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      typing: false,
    };
  }

  // gets all messages for this couple when page loads
  componentWillMount() {
    this.props.getMessages(4); //change this.props.user.coupleID
  }

  componentDidMount() {
    // on new message, updates state with new message
    socket.on('message', data => {
      this.props.addMessage(data.data);
    });

    // makes "typing ..." visible when other user is typing
    socket.on('typing', (id) => {
      if (id.slice(2) !== socket.id){
        this.setState ({ typing: true });
        setTimeout(
          () => { this.setState ({ typing: false })}, 1000);
      }
    });
  }

  render() {
    return (
      <div className="chat-card">
        <div className="row">
          <div className="col s12 m6 l4">
            <div className="card white">
              <div className="card-content black-text">
                <span className="card-title">Chat</span>
                <MessageList messages={this.props.messages}/>
                <Chat
                  socket={socket}
                  value={this.props.content}
                  onSubmit={this.props.addMessage}/>
                  <p style={{visibility:this.state.typing?'visible':'hidden'}}>typing ...</p>
              </div>
              <div className="card-action">
                <a href="#">Go to Chat</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}  

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
  };
};            

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addMessage: messageActionCreators.addMessage,
    updateMessage: messageActionCreators.updateMessage,
    getMessages: messageActionCreators.getMessages,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatCard);