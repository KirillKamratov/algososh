import React, {ChangeEvent, useEffect, useState} from "react";
import sortingStyles from './sorting.module.css'
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Column} from "../ui/column/column";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {TSorting} from "../../types/sorting";
import {randomArr} from "../../utils/utils";
import {Direction} from "../../types/direction";
import {bubbleSortingASC, bubbleSortingDESC, selectionSortingASC, selectionSortingDESC} from "./sorting-algorithms";

export const SortingPage: React.FC = () => {

  const [ array, setArray ] = useState<TSorting[]>([])
  const [ sortType, setSortType] = useState('Selection')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ direction, setDirection ] = useState<Direction>()

  let initialArr: TSorting[] = []

  const selectTypeofSorting = (event: ChangeEvent<HTMLInputElement>) => {
    setSortType(event.target.value)
  }

  useEffect(() => {
    initialArr = randomArr()
    setArray([...initialArr])
  }, [])

  const sortArray = (direction: Direction) => {
    setDirection(direction)

    if (direction === Direction.Ascending && sortType === 'Bubble') {
      bubbleSortingASC(array, setIsLoading, setArray)
    }
    else if (direction === Direction.Descending && sortType === 'Bubble') {
      bubbleSortingDESC(array, setIsLoading, setArray)
    }
    else if (direction === Direction.Ascending && sortType === 'Selection') {
      selectionSortingASC(array, setIsLoading, setArray)
    }
    else if (direction === Direction.Descending && sortType === 'Selection') {
      selectionSortingDESC(array, setIsLoading, setArray)
    }
  }

  const resetArray = () => {
    setArray([...randomArr()])
  }

  const setButtonLoading = (dir: Direction) => {
    return dir === direction && isLoading;
  }

  const setButtonDisabled = (dir: Direction) => {
    return dir !== direction && isLoading;
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingStyles.wrapper}>
        <RadioInput
          label='Выбор'
          checked={sortType === 'Selection'}
          value={'Selection'}
          onChange={selectTypeofSorting}
        />
        <RadioInput
          label='Пузырёк'
          checked={sortType === 'Bubble'}
          value={'Bubble'}
          onChange={selectTypeofSorting}
          extraClass={sortingStyles.radio}
        />
        <Button
          text='По возрастанию'
          sorting={Direction.Ascending}
          onClick={() => sortArray(Direction.Ascending)}
          isLoader={setButtonLoading(Direction.Ascending)}
          disabled={setButtonDisabled(Direction.Ascending) || array.length == 0}
        />
        <Button
          text='По убыванию'
          sorting={Direction.Descending}
          onClick={() => sortArray(Direction.Descending)}
          isLoader={setButtonLoading(Direction.Descending)}
          disabled={setButtonDisabled(Direction.Descending) || array.length == 0}
        />
        <Button
          text='Новый массив'
          onClick={resetArray}
          extraClass={sortingStyles.new}
          disabled={isLoading}
        />
      </div>
      <ul className={sortingStyles.columns}>
        {array.map((item, index) => {
          return (
            <li key={index}>
              <Column
                index={item.value}
                state={item.state}
              />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
