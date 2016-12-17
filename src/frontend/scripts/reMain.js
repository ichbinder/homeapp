import React from 'react';
import DoorOpen from 'reDoorOpen';

export class ReMain extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className="content">
        <div className="headline">
          <h2>Türöffner</h2>
        </div>
        <DoorOpen />
      </div>
    );
  }
}
