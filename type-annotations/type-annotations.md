# Type annotations

타입 어노테이션(Type annotation)이란

- 타입스크립트에 변수가 참조할 값의 타입을 알려주는 것

타입 인퍼런스(Type inference)

- 타입스크립트가 변수가 어떤 타입의 값을 참조하는지 알려주는 것

위 둘의 차이점

- 주체가 다르다
  - 타입 어노테이션은 개발자가 코드로 타입스크립트에 지정하는 것
  - 타입 인퍼런스는 타입스크립트가 하는 것

예시

```ts
const apples: number = 5;
```

- 위 코드에서 콜론(:) 타입(number) 형식으로 apples라는 변수에 참조할 값의 타입을 알려주고 있다

```ts
const apples: number = true; /* error */
```

- 위와 같이 다른 타입의 값을 대입하면 에러가 발생한다

number 이외에도 다양한 타입의 타입 어노테이션을 선언할 수 있다

```ts
let speed: string = 'fast';
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;

// built in objects
let now: Date = new Date();
```

![type_annotation](../img/type-annotation.png)

---
