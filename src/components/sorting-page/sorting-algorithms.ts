import {TSorting} from "../../types/sorting";
import {Dispatch, SetStateAction} from "react";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/utils";
import {DELAY_IN_MS} from "../../constants/delays";

export const bubbleSortingASC = async (
  arr: TSorting[],
  setLoader: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<TSorting[]>>
) => {
  setLoader(true)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing
      arr[j + 1].state = ElementStates.Changing
      setArray([...arr])
      await delay(DELAY_IN_MS)
      if (arr[j].value > arr[j + 1].value) {
        [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value]
      }
      arr[j].state = ElementStates.Default
    }
    arr[arr.length - i - 1].state = ElementStates.Modified
  }
  setLoader(false)
}

export const bubbleSortingDESC = async (
  arr: TSorting[],
  setLoader: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<TSorting[]>>
) => {
  setLoader(true)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing
      arr[j + 1].state = ElementStates.Changing
      setArray([...arr])
      await delay(DELAY_IN_MS)
      if (arr[j].value < arr[j + 1].value) {
        [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value]
      }
      arr[j].state = ElementStates.Default
    }
    arr[arr.length - i - 1].state = ElementStates.Modified
  }
  setLoader(false)
}

export const selectionSortingASC = async (
  arr: TSorting[],
  setLoader: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<TSorting[]>>
) => {
  setLoader(true)
  for (let i = 0; i< arr.length - 1; i++) {
    let min = i
    for (let j = i + 1; j< arr.length; j++) {
      arr[i].state = ElementStates.Changing
      arr[j].state = ElementStates.Changing
      setArray([...arr])
      await delay(DELAY_IN_MS)
      if (arr[j].value < arr[min].value) {
        min = j
      }
      arr[j].state = ElementStates.Default
      setArray([...arr])
    }
    [arr[i].value, arr[min].value] = [arr[min].value, arr[i].value]
    arr[i].state = ElementStates.Modified
  }
  arr[arr.length - 1].state = ElementStates.Modified
  setLoader(false)
}

export const selectionSortingDESC = async (
  arr: TSorting[],
  setLoader: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<TSorting[]>>
) => {
  setLoader(true)
  for (let i = 0; i < arr.length; i++) {
    let max = i
    for (let j = i + 1; j< arr.length; j++) {
      arr[i].state = ElementStates.Changing
      arr[j].state = ElementStates.Changing
      setArray([...arr])
      await delay(DELAY_IN_MS)
      if (arr[j].value > arr[max].value) {
        max = j
      }
      arr[j].state = ElementStates.Default
      setArray([...arr])
    }
    [arr[i].value, arr[max].value] = [arr[max].value, arr[i].value]
    arr[i].state = ElementStates.Modified
  }
  arr[arr.length - 1].state = ElementStates.Modified
  setLoader(false)
}
