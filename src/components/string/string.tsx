import React, { FormEvent, ChangeEvent, useState } from "react";
import stringStyles from './string.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TArray } from "../../types/array";
import { ElementStates } from "../../types/element-states";
import { delay, swap } from "../../utils/utils";
import {Circle} from "../ui/circle/circle";
import {DELAY_IN_MS} from "../../constants/delays";

export const StringComponent: React.FC = () => {

  const [ array, setArray ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ inputValue, setInputValue ] = useState<TArray[]>([])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArray(event.target.value)
  }

  const reverse = async ( event: FormEvent<HTMLFormElement> ) => {

    event.preventDefault()

    setIsLoading(true)
    setArray('')

    const arrayElements : TArray[] = []
    array.split('').forEach( e => {
      arrayElements.push({ value: e, state: ElementStates.Default })
    })
    setInputValue([...arrayElements])

    let start = 0
    let end = arrayElements.length - 1

    while (start <= end) {
      arrayElements[start].state = ElementStates.Changing
      arrayElements[end].state = ElementStates.Changing
      setInputValue([...arrayElements]);
      await delay(DELAY_IN_MS)
      swap(arrayElements, start, end)
      arrayElements[start].state = ElementStates.Modified
      arrayElements[end].state = ElementStates.Modified
      setInputValue([...arrayElements])
      start ++
      end --
    }
    setIsLoading(false)
  }

  return (
    <SolutionLayout title="Строка">
      <form
        className={stringStyles.formArray}
        onSubmit={reverse}
      >
        <Input
          isLimitText={true}
          maxLength={11}
          onChange={onChange}
          value={isLoading ? 'Пожалуйста, ожидайте': array}
        />
        <Button
          text={'Развернуть'}
          type={'submit'}
          linkedList={'small'}
          disabled={!array}
          isLoader={isLoading}
        />
      </form>
      <ul className={stringStyles.listArray}>
        {inputValue.map((elem, key) => {
          return (
            <li key={key}>
              <Circle
                state={elem.state}
                letter={elem.value}
            />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
