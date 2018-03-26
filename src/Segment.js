import React, { Component } from 'react'
import Card from './Card'

export default class Discard extends Component {
  constructor() {
    super();
    this.makeCards = this.makeCards.bind(this);
    this.getCount = this.getCount.bind(this);
  }

  makeCards() {
    return Object.entries(this.props.cards).map( x => <Card city={x[0]} count={x[1]} clickAction={() => this.props.clickAction(x[0])} disabled={this.props.disabled}/>);
  }

  getCount() {
    return Object.entries(this.props.cards).reduce(((base, val) => base + val[1]), 0)
  }

  render() {
    const segmentStyle = {
      display: 'flex',
      flexDirection: 'column'
    }
    const countStyle = {
      margin: '5px',
      textAlign: 'center'
    }
    return (
      <div style={segmentStyle}>
        <span style={countStyle}>Count: {this.getCount()}</span>
        {this.makeCards()}
      </div>
    );
  }
}
