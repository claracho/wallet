import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.content = 'react wallet';
  }

  render() {
    return (
      <div className="container">
        {this.content}
      </div>
    );
  }
}

export default App;
