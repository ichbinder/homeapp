import React from 'react';


export class Login extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      pw: ''
    };
    this._handlePWChange = this._handlePWChange.bind( this );
    this._handleGetToken = this._handleGetToken.bind( this );
  }

  static get propTypes() {
    return {
      onToken: React.PropTypes.func.isRequired
    };
  }

  _handlePWChange( event ) {
    this.setState( {
      pw: event.target.value
    } );
  }

  _handleGetToken() {
    this.props.onToken( this.state );
  }

  render() {
    return (
      <div className="addUser">
        <h4>Login:</h4>
        <div className="form">
          <input
            type="password"
            value={this.state.pw}
            placeholder="Passwort"
            onChange={this._handlePWChange}
          />
          <p></p>
          <button onClick={this._handleGetToken}>Senden</button>
        </div>
      </div>
    );
  }
}
