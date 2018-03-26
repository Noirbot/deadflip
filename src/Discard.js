import React, { Component } from 'react'
import Card from './Card'

export default class Discard extends Component {
  constructor() {
    super();
    this.makeCards = this.makeCards.bind(this);
  }

  makeCards() {
    return Object.entries(this.props.discard).sort((a, b) => b[1] - a[1]).map( x => <Card city={x[0]} count={x[1]} disabled={x[0]==="Hollow Men"} clickAction={() => this.props.clickAction(x[0])} key={x[0]}/>);
  }

  render() {
    const discardStyle = {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    };
    return (
      <div style={discardStyle}>
        {this.makeCards()}
      </div>
    );
  }
}
