import React from 'react';
import DoorOpen from './reDoorOpen';

export class ReMain extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className="content">
        <header>
          <h1>Türöffner</h1>
        </header>
        <DoorOpen />
      </div>
    );
  }
}
