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
