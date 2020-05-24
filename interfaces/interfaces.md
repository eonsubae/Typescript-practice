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
