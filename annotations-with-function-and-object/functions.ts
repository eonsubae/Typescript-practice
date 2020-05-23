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

const throwError = (message: string): void => {
  if (!message) {
    throw new Error(message);
  }

  // return message;
};

const todaysWeather = {
  date: new Date(),
  weather: 'sunny',
};

const logWeather = ({ date, weather }: { date: Date; weather: string }) => {
  console.log(date);
  console.log(weather);
};

logWeather(todaysWeather);
