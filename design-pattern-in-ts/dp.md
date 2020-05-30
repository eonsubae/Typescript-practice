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

---

앞서 받았던 faker 패키지를 타입스크립트에서 사용할 때의 문제점

- 일반적인 faker 라이브러리를 그대로 사용하면 타입 시스템의 이점을 얻을 수 없다
- 많은 오픈소스들도 이를 고려해 @types/라이브러리명 형식으로 타입 정보를 제공하고 있다

타입스크립트를 위한 faker 라이브러리 설치하기

```terminal
$ npm i @types/faker
```

- 설치가 완료되고 해당 패키지를 특정 파일에서 임포트했을 때
- 맥이라면 command, 윈도우라면 ctrl키를 누른 상태로 임포트한 패키지를 클릭하면 타입 정보를 포함한 파일 내용을 볼 수 있다

```ts
import faker from 'faker';

class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {}
}
```

- 예를 들어 위 파일에서 faker를 앞서 설명한대로 클릭하면 faker의 types 파일을 볼 수 있다

types 파일이 주는 이점

```ts
import faker from 'faker';

class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: faker.address.latitude(),
      lng: faker.address.longitude(),
    };
  }
}
```

- 위와 같이 코드를 수정해보면 생성자에 있는 lat, lng 부분에 에러가 발생하고 있을 것이다
- 이는 faker의 latitude와 longitude가 string 타입의 값으로 생성되기 때문이다
- 만약 자바스크립트만 사용했다면 에러가 발생하기 전에 이를 깨닫기는 어려웠을 것이다

```ts
import faker from 'faker';

class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }
}
```

- 위와 같이 변환해주는 로직을 추가하면 에러가 사라질 것이다
