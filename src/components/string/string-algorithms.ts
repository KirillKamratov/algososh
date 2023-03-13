import { swap } from "../../utils/utils";
import {TArray} from "../../types/array";
import {ElementStates} from "../../types/element-states";

export const reverse = (string: string, setArray: (arr: TArray[])  => void ) => {
  const arrayElements: TArray[] = [];
  string.split('').forEach((symbol) => {
    arrayElements.push({ value: symbol, state: ElementStates.Default });
  });
  setArray([...arrayElements]);
  let start = 0
  let end = arrayElements.length - 1
  while (start <= end) {
    arrayElements[start].state = ElementStates.Changing
    arrayElements[end].state = ElementStates.Changing
    setArray([...arrayElements])
    swap(arrayElements, start, end)
    arrayElements[start].state = ElementStates.Modified
    arrayElements[end].state = ElementStates.Modified
    setArray([...arrayElements])
    start ++
    end --
  }
  return arrayElements
}
