import React from 'react';


export class InfoBox extends React.Component {
  constructor( props ) {
    super( props );
  }

  static get propTypes() {
    return {
      color: React.PropTypes.string,
      msg: React.PropTypes.string
    };
  }

  render() {
    return (
      <div className="infoBox" style={{ backgroundColor: this.props.color }}>
        {this.props.msg}
      </div>
    );
  }
}
