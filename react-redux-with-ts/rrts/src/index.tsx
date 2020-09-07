import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
  color?: string;
}

interface AppState {
  counter: number;
}

const App = (props: AppProps): JSX.Element => {
  const [counter, setCounter]: [number, Function] = useState(0);

  const onIncrement = (): void => {
    setCounter(counter + 1);
  }

  const onDecrement = (): void => {
    setCounter(counter - 1);
  }

  return (
    <div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
      {counter}
      <br />
      {props.color}
    </div>
  );
}

/*
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      counter: 0
    };
  }

  onIncrement = (): void => {
    this.setState({ counter : this.state.counter + 1 });
  }

  onDecrement = (): void => {
    this.setState({ counter : this.state.counter - 1 });
  }

  render() {
    return (
      <div>
        <button onClick={this.onIncrement}>Increment</button>
        <button onClick={this.onDecrement}>Decrement</button>
        {this.state.counter}
      </div>
    )
  }
}
*/

ReactDOM.render(<App color="red" />, document.querySelector("#root"));