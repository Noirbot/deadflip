import React, { Component } from 'react'
import Segment from './Segment'

export default class Deck extends Component {
  constructor() {
    super();
    this.makeSegments = this.makeSegments.bind(this);
  }

  makeSegments() {
    const segments = [];
    for (const [i, seg] of this.props.deck.entries()) {
      segments.push(<Segment cards={seg} clickAction={this.props.clickAction} disabled={i !== (this.props.deck.length - 1)} key={`seg${i}`}/>)
    }
    return segments;
  }

  render() {
    const deckStyle = {
      display: 'flex',
      flexDirection: 'row'
    };
    return (
      <div style={deckStyle}>
        {this.makeSegments()}
      </div>
    );
  }
}
