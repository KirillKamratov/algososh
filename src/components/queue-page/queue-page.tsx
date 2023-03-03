import React, {ChangeEvent, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import queueStyles from './queue.module.css';
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import { Queue } from "./queue";
import {ElementStates} from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

export const QueuePage: React.FC = () => {

  const initialArr = Array.from({length: 7}, () => ({
      value: '',
      state: ElementStates.Default,
    })
  );

  const [ queue ] = useState(new Queue());
  const [ inputValue, setInputValue ] = useState<string>('')
  const [ array, setArray ] = useState(initialArr)
  const disabled = false

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const addItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const arr = [...array]
    const tail = queue.getTail()
    arr[tail].state = ElementStates.Changing
    setArray([...arr])
    await delay(SHORT_DELAY_IN_MS)
    queue.enqueue(inputValue)
    arr[tail].value = inputValue
    setArray([...arr])
    setInputValue('')
    arr[tail].state = ElementStates.Default
    setArray([...arr])
  }

  const deleteItem = async () => {
    const arr = [...array]
    const head = queue.getHead()
    arr[head].state = ElementStates.Changing
    setArray([...arr])
    await delay(SHORT_DELAY_IN_MS)
    queue.dequeue()
    arr[head].value = ''
    setArray([...arr])
    setInputValue('')
    arr[head].state = ElementStates.Default
    setArray([...arr])
  }

  const clearQueue = () => {
    queue.clear()
    setArray(initialArr)
    setInputValue('')
  }

  return (
    <SolutionLayout title="Очередь">
      <form
        className={queueStyles.formQueue}
        onSubmit={addItem}
      >
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={onChange}
          value={inputValue}
        />
        <Button
          text={'Добавить'}
          type={'submit'}
          linkedList={'small'}
          disabled={!inputValue || queue.isFull()}
        />
        <Button
          text={'Удалить'}
          linkedList={'small'}
          disabled={disabled || queue.isEmpty()}
          onClick={deleteItem}
        />
        <Button
          extraClass={queueStyles.clear}
          text={'Очистить'}
          linkedList={'small'}
          disabled={disabled || queue.getTail() === 0}
          onClick={clearQueue}
        />
      </form>
      <ul className={queueStyles.listQueue}>
        {array?.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.value}
                state={item.state}
                index={index}
                head={
                  (index === queue.getHead() &&
                    !queue.isEmpty()) || (index === queue.getHead() && queue.getHead() === queue.getSize() - 1)
                    ? HEAD
                    : ""
                }
                tail={queue.getTail() - 1 === index ? TAIL : ''}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
