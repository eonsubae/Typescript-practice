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
```ts
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
