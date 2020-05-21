const add = (a: number, b: number) => {
  return a + b;
};

const subtract = (a: number, b: number) => {
  a - b;
};

function divide(a: number, b: number) {
  return a / b;
}

const multiply = (a: number, b: number) => {
  return a * b;
};

const logger = (message: string): void => {
  console.log(message);
  // return undefined;
  // return null;
  // return "qcwpejwipqcw"; /* error */
};

const throwError = (message: string): never => {
  if (!message) {
    throw new Error(message);
  }

  return message;
};
