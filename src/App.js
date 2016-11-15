import React, { Component } from 'react';

import Burger from './components/Burger';
import FilmInfo from './components/FilmInfo';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      items: []
    };
  }

  onGetDetailsPressed = (itemId) => this.setState({ itemId })

  render() {
    const { item, items, itemId } = this.state;
    return (
        <div>
          <Burger onGetDetailsPressed={this.onGetDetailsPressed} />
          <FilmInfo itemId={itemId} />
        </div>
    )
  }
}

export default App;
