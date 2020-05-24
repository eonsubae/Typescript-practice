클래스 사용하기

```ts
class Vehicle {
  drive(): void {
    console.log('chugga chugga');
  }

  honk(): void {
    console.log('beep');
  }
}

const vehicle = new Vehicle();
vehicle.drive();
vehicle.honk();
```

- 메소드를 만들고 인스턴스를 만드는 방법 등 기초적인 것들은 대부분 비슷하다
