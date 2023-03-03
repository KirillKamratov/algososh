import { IList } from "../../types/list";

export class Node<T> {
  value: T;
  prev: Node<T> | null;
  next: Node<T> | null;
  constructor(value: T, prev?: Node<T> | null, next?: Node<T> | null) {
    this.value = value;
    this.prev = prev === undefined ? null : prev;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements IList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;

  constructor(nodes?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (nodes) {
      for (let element of nodes) {
        this.append(element);
      }
    }
  }

  getSize() {
    return this.size;
  }

  toArray() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  append(element: T) {
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    if (this.head) {
      this.head.prev = node;
    }
    node.next = this.head;
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.size += 1;
  }

  getElementByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log(`Invalid index. Current length is ${this.size}.`);
      return null;
    } else {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current?.next || null;
      }
      return current?.value || null;
    }
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      if (index === 0) {
        this.prepend(element);
        return;
      }

      if (index === this.size) {
        this.append(element);
        return;
      }

      let prevNode = this.head as Node<T>;
      for (let i = 0; i < index - 1; i++) {
        prevNode = prevNode.next as Node<T>;
      }

      const node = new Node(element);
      const nextNode = prevNode.next as Node<T>;
      node.next = nextNode;
      prevNode.next = node;
      node.prev = prevNode;
      nextNode.prev = node;

      this.size += 1;
    }
  }

  removeByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    }
    let curr = this.head;
    if (index === 0) {
      if (this.head) {
        this.head = this.head.next;
      }
    } else {
      let prev = null;
      let currIndex = 0;
      while (currIndex++ < index) {
        prev = curr;
        if (curr) {
          curr = curr.next;
        }
      }
      if (prev?.next) {
        prev.next = curr?.next ? curr.next : null;
      }
    }
    this.size--;
  }

  removeHead() {
    if (!this.head) {
      return null;
    }
    if (this.head.next) {
      this.head = this.head.next;
      this.head.prev = null;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
  }

  removeTail() {
    let current;
    if (!this.head?.next) {
      this.head = null;
    } else {
      current = this.head;
      while (current.next?.next) {
        current = current.next;
      }
      current.next = null;
    }
    this.size--;
  }
}
