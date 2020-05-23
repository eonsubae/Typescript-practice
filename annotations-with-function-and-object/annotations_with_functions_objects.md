함수와 어노테이션 함수와 인퍼런스
![function_annotation_inference](../img/function_annotation_inference.png)

- 어노테이션으로 타입스크립트에 인자와 리턴타입 모두 알려주는 것이 가능
- 인퍼런스는 타입스크립트가 어떤 타입이 리턴되는지를 추론

함수와 어노테이션

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
```

- (인자1: 타입, 인자2: 타입, ...): 타입 형식으로 인자의 타입과 리턴 타입을 지정한다

---

함수와 인퍼런스
![function_inference](../img/function_inference.png)

- 함수의 인자에는 인퍼런스를 사용할 수 없다
- 함수의 반환값에는 타입 어노테이션을 적용한 인자들을 사용하면 인퍼런스 효과를 얻을 수 있다
- 그럼에도 불구하고 함수의 리턴값에도 인퍼런스를 사용하지 않는 것이 좋다

함수의 리턴 타입에 인퍼런스가 적용된 예시
![function_output_inference](../img/function_output_inference.png)

- 리턴 타입에 대한 어노테이션을 지웠음에도 인퍼런스를 통해 리턴 타입의 정보를 얻고 있다

함수에 인퍼런스를 사용하지 않는 것이 좋은 이유

```ts
const subtract = (a: number, b: number) => {
  a - b;
};
```

- 위 사례처럼 어노테이션을 적용하지 않은 경우 타입스크립트가 에러를 발생시키지 않는 경우가 있다
- 이처럼 함수에 어노테이션을 사용하면 실수할 확률이 높아지므로 함수에는 인퍼런스를 사용하지 않는 것이 좋다

---

named function과 anonymous function에 타입 어노테이션을 사용하는 방법

```ts
// named function
function divide(a: number, b: number) {
  return a / b;
}

// anonymous function
const multiply = (a: number, b: number) => {
  return a * b;
};
```

---

void와 never

- 함수가 어떤 값도 반환하지 않을 경우 void 어노테이션을 적용하는 것이 좋다

```ts
const logger = (message: string): void => {
  console.log(message);
};
```

- undefined와 null을 반환하면 void 어노테이션을 적용한 경우에도 에러가 발생하지 않는다

```ts
const logger = (message: string): void => {
  console.log(message);
  return undefined;
};
```

```ts
const logger = (message: string): void => {
  console.log(message);
  return null;
};
```

- 이 이외의 값을 반환하면 타입스크립트가 에러를 발생시켜준다

```ts
const logger = (message: string): void => {
  console.log(message);
  return 'qcwpejwipqcw'; /* error */
};
```

- 어떤 값도 리턴되기를 원하지 않는 경우 never 어노테이션을 사용한다

```ts
const throwError = (message: string): never => {
  throw new Error(message);
};
```

- 에러가 발생했지만 어떤 값도 리턴되지 않는다

```ts
const throwError = (message: string): never => {
  if (!message) {
    throw new Error(message);
  }

  return message; /* error */
};
```

- 조건에 따라 리턴값이 있을 수도 없을 수도 있는 경우에는 never를 사용할 수 없다
- never는 어떤 값도 반환되어서는 안된다는 것을 표현하는 어노테이션이라고 생각하면 된다
- 따라서 위와 같은 조건에 따른 값의 반환이 있는 경우 string등의 어노테이션을 적용하는 것이 옳다

```ts
const throwError = (message: string): string /* never(x) */ => {
  if (!message) {
    throw new Error(message);
  }

  return message;
};
```

---

디스트럭쳐링 활용하기
```ts
const todaysWeather = {
  date: new Date(),
  weather: 'sunny',
};

const logWeather = (forecast: { date: Date; weather: string }) => {
  console.log(forecast.date);
  console.log(forecast.weather);
};

logWeather(todaysWeather);
```
* 오브젝트 리터럴도 위 코드의 { date: Date; weather: string } 부분처럼 어노테이션을 사용할 수 있다
* 위와 같은 처리도 괜찮지만 보다 간결하게 위 작업을 처리하기 위해 ES6의 디스트럭쳐링을 사용할 수도 있다

```ts
const todaysWeather = {
  date: new Date(),
  weather: 'sunny',
};

const logWeather = ({ date, weather }: { date: Date; weather: string }) => {
  console.log(date);
  console.log(weather);
};

logWeather(todaysWeather);
```
* 각 프로퍼티를 호출하기 위해 반복적으로 forecast를 사용하던 코드들이 제거됐다

---

오브젝트 리터럴과 디스트럭쳐링 예시2
```ts
const profile = {
  name: 'alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },
  setAge(age: number) {
    this.age = age;
  }
};

const { age } = profile;
```
* 위 코드처럼 특정 오브젝트 리터럴을 초기화하고 디스트럭쳐링으로 특정 프로퍼티 값을 가져올 수 있다
* 그런데 디스트럭쳐링된 age라는 변수는 아직 타입에 대한 힌트가 없는 상태다

```ts
// (...)

const { age }: { age: number } = profile;
const { 
  coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;
```
* 위 처럼 { 변수명: 타입 }의 형식으로 애노테이션을 적용할 수 있다