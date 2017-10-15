import React from 'react';
import axios from 'axios';

const SERVER_URL = 'https://home.opentoken.de';

export default class TuerOpen extends React.Component {
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
      <div className="divButton">
        <button onClick={this._handleOpenDoor} className="button button1">
          <h2>Tür Öffnen</h2>
        </button>
      </div>
    );
  }
}
