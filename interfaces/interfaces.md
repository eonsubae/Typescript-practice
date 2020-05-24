어노테이션의 문제점

```ts
const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true,
};

const printVehicle = (vehicle: {
  name: string;
  year: number;
  broken: boolean;
}): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken? ${vehicle.broken}`);
};

printVehicle(oldCivic);
```

- 위 코드는 자동차 객체를 인자로 받아 자동차 객체의 정보를 출력하는 함수에 관한 코드다
- 문제는 객체의 프로퍼티가 3개만 되어도 애노테이션의 길이가 너무 길어져서 보기가 힘들다
- 만약 프로퍼티가 10개 이상이 된다면 함수를 이해하기 지나치게 힘들어질 것이다

인터페이스로 문제 해결하기

```ts
interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
}

const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true,
};

const printVehicle = (vehicle: Vehicle): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken? ${vehicle.broken}`);
};

printVehicle(oldCivic);
```

- 인터페이스를 사용하면 코드의 길이도 짧아지고 인자로 넘어온 객체의 프로퍼티명이 다를 때에도 타입스크립트가 에러를 발생시켜 실수를 줄이는데 도움이 된다

인터페이스의 타입

- 위에서 정의한 Vehicle처럼 string, number, boolean과 같은 기본 타입 외에도 다양한 타입을 사용할 수 있다

```ts
interface Vehicle {
  name: string;
  year: Date;
  broken: boolean;
}
```

- number형이던 year를 Date와 같은 객체로 변경할 수도 있다

```ts
interface Vehicle {
  name: string;
  year: number; // Date
  broken: boolean;
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true,
  summary() {
    return `Name: ${this.name}`;
  },
};

const printVehicle = (vehicle: Vehicle): void => {
  console.log(vehicle.summary());
};

printVehicle(oldCivic);
```

- 인터페이스 내부에 함수를 정의해서 Vehicle 인터페이스를 사용한 객체가 해당 함수를 구현하도록 강제하게 만들 수도 있다

성질이 다른 여러 객체에 적용가능한 인터페이스 작성하기

```ts
interface Reportable {
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true,
  summary() {
    return `Name: ${this.name}`;
  },
};

const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`;
  },
};

const printSummary = (item: Reportable): void => {
  console.log(item.summary());
};

printSummary(oldCivic);
printSummary(drink);
```

- Reportable은 특정 객체의 요약 문자열을 반환하는 함수다
- 그 객체가 vehicle이든 drink이든 summary라는 함수만 정의에 맞게 구현하고 있다면 재활용할 수 있다
