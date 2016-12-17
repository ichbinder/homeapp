import React from 'react';
import axios from 'axios';

const SERVER_URL = 'http://home.opentoken.de:8080';

export class TuerOpen extends React.Component {
  constructor( props ) {
    super( props );
    this._handleOpenDoor = this._handleOpenDoor.bind( this );
  }

  _handleOpenDoor() {
    const _this = this;
    axios.get( `${SERVER_URL}/tuer` )
    .then( ( response ) => {
      console.log( 'Tatus: ', response );
    } )
    .catch( ( error ) => {
      console.log( 'Error: ', error );
    } );
  }

  render() {
    return (
      <div className="addUser">
        <div className="form">
          <button onClick={this._handleOpenDoor}>Tür Öffnen</button>
        </div>
      </div>
    );
  }
}
