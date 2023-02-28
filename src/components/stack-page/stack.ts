interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void;
  getStack: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item)
  };

  pop = (): void => {
    this.container.pop()
  };

  peak = (): T | null => {
    return this.container[this.getSize() - 1] || null;
  };

  getSize = () => this.container.length;

  getStack = () => this.container;

  clear = (): void => {
    this.container = [];
  };

}
