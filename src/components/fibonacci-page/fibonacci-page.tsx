import React, { useState, ChangeEvent, FormEvent } from "react";
import fibonacciStyles from './fibonacci.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { delay } from "../../utils/utils";
import {Circle} from "../ui/circle/circle";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {

  const [ number, setNumber ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ inputValue, setInputValue ] = useState<number[]>([])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value)
  }

  const fibonacci = (number: number) : number[] => {
    const arr = [1, 1]
    for (let i = 2; i < number +1; i++) {
      arr.push(arr[i - 2] + arr[i - 1])
    }
    return arr
  }

  const showFibonacci = async ( event: FormEvent<HTMLFormElement> ) => {

    event.preventDefault()
    setIsLoading(true)
    const fibonacciArray = fibonacci(Number(number))
    let index = 0
    const arr: number[] = []

    while (index <= Number(number)) {
      await delay(SHORT_DELAY_IN_MS)
      arr.push(fibonacciArray[index])
      setInputValue([...arr])
      index ++
    }

    setIsLoading(false)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        className={fibonacciStyles.formFib}
        onSubmit={showFibonacci}
      >
        <Input
          isLimitText={true}
          min={1}
          max={19}
          type={'number'}
          onChange={onChange}
          value={isLoading ? 'Пожалуйста, ожидайте': number}
          data-testid={"input"}
        />
        <Button
          text={'Рассчитать'}
          type={'submit'}
          linkedList={'small'}
          disabled={!number}
          isLoader={isLoading}
          data-testid={"button"}
        />
      </form>
      <ul className={fibonacciStyles.listFib}>
        {inputValue?.map((number, key) => {
          return (
            <li key={key} data-testid={"item"}>
              <Circle
                letter={`${number}`}
                index={key}
              />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
