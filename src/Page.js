import React, { Component } from 'react'
import Deck from './Deck'
import Discard from './Discard'

const deck = require('./data/deck.json');

class Page extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      draw: [deck],
      discard = {}
    };
    this.drawCard = this.drawCard.bind(this);
    this.epidemic = this.epidemic.bind(this);
  }

  drawCard(city, drawTop=true) {
    const discard = {...this.state.discard}
    const draw = [...this.state.draw]
    let segment;
    if (drawTop) {
      // Draw from the most recent segment, at the top of the deck
      segment = draw[draw.length - 1];
    } else {
      // Draw from the bottom segment for an epidemic.
      segment = draw[0];
    }

    const cardCount = segment[city];
    if (!cardCount) {
      return new Error(`Card not in last deck segment: ${city}`);
    }

    if (cardCount === 1) {
      delete segment[city];
    } else {
      segment[city] = cardCount - 1;
    }

    if (discard[city]) {
      discard[city]++
    } else {
      discard[city] = 1
    }


    if(Object.keys(segment).length === 0) {
      draw.pop();
    }

    if (drawTop) {
      this.setState({draw, discard});
    }
  }

  epidemic(bottomCity) {
    const draw = [...this.state.draw]
    const discard = {...this.state.discard}
    this.drawCard(bottomCity, false)
    draw.push({...discard});
    discard = {}
    this.setState({draw, discard});
  }

  getChildContext() {
    return {
      drawCard: this.drawCard,
      epidemic: this.epidemic
    }
  }

  render() {
    return (
      <div>
        <Deck deck={this.state.deck}/>
        <Discard discard={this.state.discard}/>
      </div>
    );
  }
}
