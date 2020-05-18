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
