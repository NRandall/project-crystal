import React, {Component} from 'react';
 
class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className='message-list'>
        {this.props.messages && this.props.messages.slice(-6).map((message, index) => {
          const messageClass = message.user_id === 8 ? 'right-align' : 'left-align';
          return (
            <li key={`message-${index}`} className='message-item'>
              <p className='timestamp'>{Date.parse(message.created_at).toDateString}</p>
              <p className={`message ${messageClass}`}>
                {message.content}
              </p>
            </li>
          );
        })}
      </ul>
    );
  }
}

module.exports = MessageList;