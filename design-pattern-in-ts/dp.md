이 챕터에서 만들 앱

![dp_overview](../img/dp_overview.png)

사용할 모듈

```terminal
$ npm i -g parcel-bundler
```

- ts를 브라우저에서 실행할 수 있는 편리한 환경을 제공해준다

parcel bundler사용법

```html
<!-- index.html -->
<html>
  <body>
    <script src="src/index.ts"></script>
  </body>
</html>
```

```ts
// src/index.ts
console.log('Hi there');
```

```terminal
parcel index.html(임의의 html파일이름)
```

- 위와 같은 간단한 코드가 있다고 가정했을 때, 이 CLI를 실행하면 parcel bundler가 ts파일을 컴파일해 브라우저에서 실행시켜준다

사용자의 좌표를 임의의 값으로 설정해줄 faker 라이브러리 설치

```terminal
npm install faker
```

지금부터 코드의 작성은 parcel bundler를 실행하고 있는 상태에서 진행한다고 생각하면 된다

```terminal
parcel index.html
```

- 만약 parcle bundler가 실행되지 않고 있다면 위 cli를 사용하자
