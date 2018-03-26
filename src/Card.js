import React, { Component } from 'react'
import { Button, Badge } from 'react-bootstrap';

export default class Card extends Component {
  render() {
    const cardStyle = {
      margin: '5px',
      width: '15em'
    }

    return (
      <div>
        <Button
          style={cardStyle}
          bsStyle="primary"
          bsSize="small"
          onClick={this.props.clickAction}
          disabled={this.props.disabled}
        >
          {this.props.city} <Badge pullRight>{this.props.count}</Badge>
        </Button>
      </div>
    )
  }
}
