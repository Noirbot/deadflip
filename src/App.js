import React, { Component } from 'react';
import './App.css';
import Deck from './Deck'
import Discard from './Discard'
import { Button } from 'react-bootstrap';

const deck = require('./data/deck.json');

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      draw: [deck],
      discard: {}
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

  epidemic(bottomCity) {
    let updated = this.drawCard(bottomCity, false)
    const draw = updated[0]
    let discard = updated[1]
    draw.push({...discard})
    discard = {}
    this.setState({draw, discard})
  }

  immunize(city) {
    const discard = {...this.state.discard}
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

    this.setState({discard: discard})
  }

  render() {
    const bodyStyle = {
      display:'flex',
      flexDirection:'column',
      padding: '0px'
    };
    const epiStyle = {

    };

    return (
      <div style={bodyStyle}>
        <Deck deck={this.state.draw} clickAction={this.drawCard}/>
        <hr />
        <Discard discard={this.state.discard} clickAction={this.immunize}/>
        <hr />
        <div style={epiStyle}>
          <Button onClick={() => this.epidemic(this.epidemicCard.value)} bsStyle="success">Epidemic!</Button>
          <select id='epidemicCard' ref={(select) => {this.epidemicCard = select; }}>
            {Object.keys(this.state.draw[0]).map(x => <option value={x} key={x}>{x}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

export default App;
