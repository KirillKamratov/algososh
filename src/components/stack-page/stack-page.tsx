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
import {SHORT_DELAY_IN_MS} from "../../constants/delays";


export const StackPage: React.FC = () => {

  const [stack] = useState(new Stack<TArray>());
  const [ inputValue, setInputValue ] = useState('')
  const [ array, setArray ] = useState<TArray[]>([])
  const [isLoading, setIsLoading] = useState({
    add: false,
    delete: false,
    clear: false,
  });
  const [disabled, setDisabled] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const addItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading({ ...isLoading, add: true });
    setDisabled(true);
    stack.push({ value: inputValue, state: ElementStates.Changing });
    setArray([...stack.getStack()]);
    setInputValue('');
    await delay(SHORT_DELAY_IN_MS);
    const temp = stack.peak();
    if (temp) {
      temp.state = ElementStates.Default;
    }
    setArray([...stack.getStack()]);
    setIsLoading({ ...isLoading, add: false });
    setDisabled(false);
  }

  const deleteItem = async () => {
    setIsLoading({ ...isLoading, delete: true });
    setDisabled(true);
    const temp = stack.peak()
    if (temp) {
      temp.state = ElementStates.Changing
    }
    setArray([...stack.getStack()])
    await delay(SHORT_DELAY_IN_MS)
    stack.pop()
    setArray([...stack.getStack()])
    setIsLoading({ ...isLoading, delete: false });
    setDisabled(false);
  }

  const clearStack = () => {
    setIsLoading({ ...isLoading, clear: true });
    setDisabled(true);
    stack.clear();
    setArray([...stack.getStack()]);
    setDisabled(false);
    setIsLoading({ ...isLoading, clear: false });
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
          data-testid={"input"}
        />
        <Button
          text={'Добавить'}
          type={'submit'}
          linkedList={'small'}
          disabled={!inputValue}
          isLoader={isLoading.add}
          data-testid={"addButton"}
        />
        <Button
          text={'Удалить'}
          linkedList={'small'}
          disabled={disabled || array.length == 0}
          onClick={deleteItem}
          isLoader={isLoading.delete}
          data-testid={"deleteButton"}
        />
        <Button
          extraClass={stackStyles.clear}
          text={'Очистить'}
          linkedList={'small'}
          disabled={disabled || array.length == 0}
          onClick={clearStack}
          isLoader={isLoading.clear}
          data-testid={"clearButton"}
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
