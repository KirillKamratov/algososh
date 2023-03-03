interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getQueue: () => (T | null)[];
  clear: () => void;
  getHead: () => number;
  getTail: () => number;
  getSize: () => number;
  isFull: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number = 7) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  isEmpty = () => this.length == 0;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item
    this.tail++
    this.length++
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    delete this.container[this.head % this.size]
    this.head++
    this.length--
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size]
  };

  getQueue = () => this.container;

  getSize = () => this.container.length;

  getTail = () => this.tail;

  getHead = () => this.head;

  isFull = () => this.tail > this.size - 1;

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = [];
  };
}



