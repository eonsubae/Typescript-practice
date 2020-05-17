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

배열과 타입 어노테이션

```ts
// Array
let colors: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [1, 2, 3];
let truths: boolean[] = [true, true, false];
```

- 위와 같이 콜론(:) 타입(string, number, boolean, etc...)[]의 형식으로 작성한다

클래스와 타입 어노테이션

```ts
// Classes
class Car {}

let car: Car = new Car();
```

- 변수명과 클래스명이 대문자, 소문자 구분을 제외하면 똑같기 때문에 헷갈릴 수 있다
- 이 문제는 클래스의 첫 문자를 대문자로 사용하는 컨벤션으로 해결한다

오브젝트 리터럴과 타입 어노테이션

```ts
// Object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20,
};
```

- { key1: type of key1; key2: type of key2; etc... }의 형식으로 작성한다
