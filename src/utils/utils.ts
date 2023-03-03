import {TSorting} from "../types/sorting";
import {ElementStates} from "../types/element-states";

export const delay = (delay: number ): Promise<null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
};

export const swap = <T>(arr: Array<T>, firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const randomArr = () => {
  const temp: TSorting[] = []
  const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + 1)
  }
  const length = Math.random() * (17 - 3) + 3;
  for (let i = 0; i < length; i++) {
   temp.push({ value: randInt(1, 100), state: ElementStates.Default})
  }
  return temp
}


