import React, { Component, ReactNode } from 'react';

//setting the type for the 'count' variable since it didn't have one before
interface State {
  count: number;
}

//Since this component doesn't receive any props, I passed {} for the Component's generic parameter.
class Counter extends Component<{}, State> {
  state: State = {
    count: 0
  };

//defining the function type for the increment method (void)
  increment = ():void => {
    this.setState({ count: this.state.count + 1 });
  };

//doing the same shit for the render method
  render():ReactNode {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;

