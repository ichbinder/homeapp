import React from 'react';

export class UserAdd extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      username: '',
      pw: ''
    };

    this._handleUsernameChange = this._handleUsernameChange.bind( this );
    this._handlePWChange = this._handlePWChange.bind( this );
    this._handleUserAdd = this._handleUserAdd.bind( this );
  }

  static get propTypes() {
    return {
      onUserAdd: React.PropTypes.func.isRequired
    };
  }

  _handleUsernameChange( event ) {
    this.setState( {
      username: event.target.value
    } );
  }

  _handlePWChange( event ) {
    this.setState( {
      pw: event.target.value
    } );
  }

  _handleUserAdd() {
    this.props.onUserAdd( this.state );
  }

  render() {
    return (
      <div className="addUser">
        <h4>Gebein Sie Ihren Uni Login ein:</h4>
        <div className="form">
          <input
            type="text"
            value={this.state.username}
            placeholder="Benutzername"
            onChange={this._handleUsernameChange}
          />
          <p></p>
          <input
            type="password"
            value={this.state.pw}
            placeholder="Passwort"
            onChange={this._handlePWChange}
          />
          <p></p>
          <button onClick={this._handleUserAdd}>Senden</button>
        </div>
      </div>
    );
  }
}
