import { ElementStates } from "./element-states";


export interface IList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  getElementByIndex: (index: number) => T | null;
  addByIndex: (element: T, index: number) => void;
  removeByIndex: (index: number) => void;
  removeHead: () => void;
  removeTail: () => void;
  getSize: () => number;
  toArray: () => T[];
}

export interface IInitialList {
  value: string;
  state: ElementStates;
  head?: string;
  tail?: string;
}



