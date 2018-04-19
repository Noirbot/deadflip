import React, { Component } from 'react';
import './App.css';
import Deck from './Deck'
import Discard from './Discard'
import Immune from './Immune'

const deck = require('./data/deck.json');
const immune = require('./data/immune.json');

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      draw: [deck],
      discard: {"Hollow Men": 8},
      immune: immune
    };
    this.drawCard = this.drawCard.bind(this);
    this.epidemic = this.epidemic.bind(this);
    this.immunize = this.immunize.bind(this);
  }

  drawCard(city, drawTop=true) {
    const draw = [...this.state.draw]
    const discard = {...this.state.discard}
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

    return [draw, discard]
  }

  epidemic(city) {
    const draw = [...this.state.draw]
    let discard = {...this.state.discard}
    const immune = {...this.state.immune}
    const cardCount = immune[city]

    if (cardCount === 1) {
      delete immune[city]
    } else {
      immune[city] = cardCount - 1;
    }

    if (discard[city]) {
      discard[city]++
    } else {
      discard[city] = 1
    }
    draw.push({...discard})
    discard = {}
    this.setState({draw, discard, immune})
  }

  immunize(city) {
    const discard = {...this.state.discard}
    const immune = {...this.state.immune}
    const cardCount = discard[city]

    console.log(`Immunizing ${city}`)

    if (!cardCount) {
      return new Error(`Card not in discard pile: ${city}`)
    }

    if (cardCount === 1) {
      delete discard[city]
    } else {
      discard[city] = cardCount - 1;
    }

    if (immune[city]) {
      immune[city]++
    } else {
      immune[city] = 1
    }

    this.setState({discard: discard, immune: immune})
  }

  render() {
    const bodyStyle = {
      display:'flex',
      flexDirection:'column',
      padding: '0px'
    };

    return (
      <div style={bodyStyle}>
        <Deck deck={this.state.draw} clickAction={this.drawCard}/>
        <hr />
        <Discard discard={this.state.discard} clickAction={this.immunize}/>
        <hr />
        <Immune immune={this.state.immune} clickAction={this.epidemic} />
      </div>
    );
  }
}

export default App;
