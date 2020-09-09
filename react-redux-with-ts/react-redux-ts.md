# React and Redux with Typescript

## 리액트 리덕스 환경에서 타입스크립트를 사용할 때의 장단점

장점
1. 오타, 잘못된 액션 타입을 지정했을 때와 같은 기본적인 실수를 줄여준다
2. 데이터의 흐름을 더 쉽게 파악할 수 있게 해준다
3. 리팩토링을 더 쉽게 할 수 있다

단점
1. 타입 설정 파일의 문제
  - 특히 redux는 타입 설정 파일(type definition file)이 최적화되어 있지 않다
2. generic이 제대로 작동하지 않을 때가 있다
3. 너무 많은 임포트와 타입(action creator, action, reducer, store, component)이 필요해서 코드량이 많아지고 결합도가 증가한다
4. 리덕스는 모든 기능이 함수로 되어 있고 fp를 지향하는 반면 타입스크립트는 클래스 중심의 언어기 때문에 다른 라이브러리를 사용할 때 클래스로 작성된 코드가 많은데 이를 같이 사용할 때 결합이 힘든 경우가 있다

---

## 새 프로젝트 생성하기

```terminal
$ npx create-react-app rrts --typescript
```

프로젝트가 생성되면 해당 폴더로 이동한다
```terminal
$ cd rrts
```

밑바닥부터 하나씩 코드를 추가해가며 이해하기 위해 src폴더를 전부 삭제한 후 다시 src폴더를 생성한다
* 그런 다음 src폴더에 index.tsx파일을 생성하고 아래 코드를 추가한다
```tsx
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return <div>Hi there</div>
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

애플리케이션을 실행해서 확인해보자
```terminal
$ npm start
```

---

## Props 사용하기

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return <div>{this.props.color}</div>
    }
}

ReactDOM.render(<App color="red" />, document.querySelector("#root"));
```
* App 컴포넌트에 red라는 문자열을 가진 color props를 넘겨준다
* 자바스크립트로 작성된 컴포넌트라면 문제가 없지만 ts에서는 아래와 같이 에러가 발생할 것이다

![react-props-ts](../img/react-props-with-ts.png)
* TS와 함께 리액트 앱을 작성할 때는 props의 목록과 타입을 지정해줘야 한다
* 일반적으로는 인터페이스를 사용해 이 문제를 해결한다

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
    color?: string;
}

class App extends React.Component<AppProps> {
    render() {
        return <div>{this.props.color}</div>
    }
}

ReactDOM.render(<App color="red" />, document.querySelector("#root"));
```
* React.Component에 Generic을 활용해 작성한 인터페이스를 적용한다
* 에러가 사라졌는지 확인해보자
* 필수 props가 아니라면 위와 같이 props명 뒤에 ?마크를 붙여줘야 한다
  - 그렇지 않고 props를 넘겨주지 않으면 에러가 발생한다

---

## State Handling

버튼을 클릭해 counter state를 증가 또는 감소시키는 간단한 코드를 작성했다
```tsx
import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
    color?: string;
}

class App extends React.Component<AppProps> {
  state = {
    counter: 0
  };

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

ReactDOM.render(<App />, document.querySelector("#root"));
```
* 얼핏 보기엔 아무런 문제도 없는 매우 명확하고 간단한 코드이지만 내부적으로는 상당히 복잡한 문제들이 있다

---

## Confusing Component State

state선언 문법
```js
class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      counter: 0
    };
  }

  /* (...) */
}
```
* 일반적인 자바스크립트 클래스 문법이라면 위와 같이 생성자 안에서 멤버변수를 선언한다
* 위 코드는 앞서 보았던 코드와 정확히 같은 동작을 하는 코드다
* 그런데 실제로 위와 같이 코드를 고쳐보면 에러가 발생하고 있는 것을 확인할 수 있을 것이다
* 이는 타입스크립트에서 두 가지 멤버변수 선언방식이 다르게 동작하기 때문이다

![cba-error](../img/cba-error.png)
* 마우스를 에러가 발생한 곳에 올려놓으면 Property 'counter' does not exist on type 'Readonly<{}>'.ts(2339)라는 에러가 나올 것이다
* 이는 리액트 컴포넌트 스테이트의 초기값이 아무런 타입이 없는 빈 값이기 때문에 발생하는 에러다
* 앞서 선언했던 방식과 생성자를 선언하는 방식의 차이점이 여기서 드러난다
* 앞서 선언했던 방식은 읽기전용으로 동작하지 않고 스테이트를 재정의한다
* 재정의에 의해 기존 리액트 컴포넌트 스테이트의 타입을 사용하지 않고 재정의한 타입으로 변경되어 에러가 발생하지 않았던 것이다

생성자를 이용한 방식을 사용하면서 에러 없애기
```tsx
import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
  color?: string;
}

interface AppState {
  counter: number;
}

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

ReactDOM.render(<App />, document.querySelector("#root"));
```
* React.Component에 제네릭을 사용해 두 번째 인자로 스테이트의 타입을 정의할 수 있다
* 그럼 생성자를 사용하더라도 멤버변수의 타입이 재정의된다

---

## Functional Components with TS

클래스 기반 컴포넌트와 같은 기능을 하는 코드를 함수형 컴포넌트로 만들어 보기
```tsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
  color?: string;
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

ReactDOM.render(<App color="red" />, document.querySelector("#root"));
```
* 다른 내용들은 큰 차이가 없으나 반환 타입을 JSX.Element로 설정하는 것을 알아두자

---

# Setup Redux 

다음 패키지들을 설치해준다
```terminal
$ npm i redux react-reudx axios redux-thunk
```

index.tsx파일을 수정하기
```tsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.querySelector("#root"));
```
* createStore는 앱 전체에서 사용할 스토어를 생성한다
* applyMiddleware의 인자로 thunk를 보내 액션 크리에이터 내부에서 비동기 작업을 처리할 수 있도록 만든다
* Provider로 생성한 리덕스 스토어 및 적용된 미들웨어로 애플리케이션 전체를 래핑한다

타입 데피니션 파일
![type-definition-file-error](../img/react-redux-type-definition-file-error.png)
* 임포트 부분을 보면 redux와 redux-thunk패키지는 타입 정의 파일을 제공해주고 있어 에러가 발생하지 않는다
* 그러나 react-redux처럼 타입 정의 파일을 기본으로 포함시키지 않고 있는 패키지는 따로 파일을 받거나 직접 생성해주어야 한다

Installing type definition file of react-redux
```terminal
$ npm install @types/react-redux
```
* 설치가 완료되면 더 이상 임포트 부분에 에러가 발생하지 않는 것을 확인할 수 있을 것이다

App컴포넌트 작성하기
* src/components폴더를 생성하고 폴더 내부에 App.tsx파일을 생성한다
```tsx
import React from 'react';

export class App extends React.Component {
  render() {
    return <div>Hi there!</div>
  }
}
```

Reducer생성하기
* src/reducers폴더를 생성하고 폴더 내부에 index.ts파일을 생성한다
```tsx
import { combineReducers } from 'redux';

export const reducers = combineReducers({
  counter: () => 1
});
```

index.tsx파일에서 생성한 App컴포넌트와 Reducer불러오기
```tsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { App } from './components/App';
import { reducers } from './reducers/index';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.querySelector("#root"));
```
* 이제 모든 에러가 사라진 것을 확인할 수 있을 것이다

---