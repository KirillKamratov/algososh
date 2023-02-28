import React, {ChangeEvent, FormEvent, useState} from "react";
import stackStyles from './stack.module.css'
import { Stack } from "./stack";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TArray } from "../../types/array";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";


export const StackPage: React.FC = () => {

  const [stack] = useState(new Stack<TArray>());
  const [ inputValue, setInputValue ] = useState('')
  const [ array, setArray ] = useState<TArray[]>([])
  const disabled = false

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const addItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    stack.push({ value: inputValue, state: ElementStates.Changing });
    setArray([...stack.getStack()]);
    setInputValue('');
    await delay(500);
    const temp = stack.peak();
    if (temp) {
      temp.state = ElementStates.Default;
    }
    setArray([...stack.getStack()]);
  }

  const deleteItem = async () => {
    const temp = stack.peak()
    if (temp) {
      temp.state = ElementStates.Changing
    }
    setArray([...stack.getStack()])
    await delay(500)
    stack.pop()
    setArray([...stack.getStack()])
  }

  const clearStack = () => {
    stack.clear();
    setArray([...stack.getStack()]);
  }

  return (
    <SolutionLayout title="Стек">
      <form
        className={stackStyles.formStack}
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
          disabled={!inputValue}
        />
        <Button
          text={'Удалить'}
          linkedList={'small'}
          disabled={disabled || array.length == 0}
          onClick={deleteItem}
        />
        <Button
          extraClass={stackStyles.clear}
          text={'Очистить'}
          linkedList={'small'}
          disabled={disabled || array.length == 0}
          onClick={clearStack}
        />
      </form>
      <ul className={stackStyles.listStack}>
        {array?.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.value}
                state={item.state}
                index={index}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
