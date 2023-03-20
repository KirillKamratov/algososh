import "@testing-library/jest-dom/extend-expect";
import {
  bubbleSortingASC,
  bubbleSortingDESC,
  selectionSortingDESC,
  selectionSortingASC
} from "./sorting-algorithms";
import { ElementStates } from "../../types/element-states";


const multipleOutputArray = [
  { value: 52, state: ElementStates.Modified },
  { value: 97, state: ElementStates.Modified },
  { value: 62, state: ElementStates.Modified },
  { value: 4, state: ElementStates.Modified },
];

const multipleOutputArrayAscending = [
  { value: 4, state: ElementStates.Modified },
  { value: 52, state: ElementStates.Modified },
  { value: 62, state: ElementStates.Modified },
  { value: 97, state: ElementStates.Modified },
];

const multipleOutputArrayDescending = [
  { value: 97, state: ElementStates.Modified },
  { value: 62, state: ElementStates.Modified },
  { value: 52, state: ElementStates.Modified },
  { value: 4, state: ElementStates.Modified },
];

const singleOutputArray = [
  { value: 1, state: ElementStates.Modified}
]

jest.setTimeout(25000);

const setLoader = jest.fn()
const setArray = jest.fn()


describe('Testing ascending sorting algorithms', () => {
  it('Ascending bubble sorting algorithm with empty array', async () => {
    await bubbleSortingASC([], setLoader, setArray)
    expect(setArray).toHaveBeenCalledTimes(0)
  })

  it('Ascending bubble sorting algorithm with multiple output array', async () => {
    await bubbleSortingASC(multipleOutputArray, setLoader, setArray)
    expect(setArray).toHaveBeenLastCalledWith(multipleOutputArrayAscending)
  })

  it('Ascending bubble sorting algorithm with single output array', async () => {
    await bubbleSortingASC(singleOutputArray, setLoader, setArray)
    expect(setArray).toHaveBeenCalledTimes(0)
  })

  it('Ascending selection sorting algorithm with empty array', async () => {
    await selectionSortingASC([], setLoader, setArray)
    expect(setArray).toHaveBeenCalledTimes(0)
  })

  it('Ascending selection sorting algorithm with multiple output array', async () => {
    await selectionSortingASC(multipleOutputArray, setLoader, setArray)
    expect(setArray).toHaveBeenLastCalledWith(multipleOutputArrayAscending)
  })

  it('Ascending selection sorting algorithm with single output array', async () => {
    await selectionSortingASC(singleOutputArray, setLoader, setArray)
    expect(setArray).toHaveBeenCalledTimes(0)
  })

})

describe('Testing descending sorting algorithms', () => {
  it('Descending bubble sorting algorithm with empty array', async () => {
    await bubbleSortingDESC([], setLoader, setArray)
    expect(setArray).toHaveBeenCalledTimes(0)
  })

  it('Descending bubble sorting algorithm with multiple output array', async () => {
    await bubbleSortingDESC(multipleOutputArray, setLoader, setArray)
    expect(setArray).toHaveBeenLastCalledWith(multipleOutputArrayDescending)
  })

  it('Descending bubble sorting algorithm with single output array', async () => {
    await bubbleSortingDESC(singleOutputArray, setLoader, setArray)
    expect(setArray).toHaveBeenCalledTimes(0)
  })

  it('Descending selection sorting algorithm with empty array', async () => {
    await selectionSortingDESC([], setLoader, setArray)
    expect(setArray).toHaveBeenCalledTimes(0)
  })

  it('Descending selection sorting algorithm with multiple output array', async () => {
    await selectionSortingDESC(multipleOutputArray, setLoader, setArray)
    expect(setArray).toHaveBeenLastCalledWith(multipleOutputArrayDescending)
  })

  it('Descending selection sorting algorithm with single output array', async () => {
    await selectionSortingDESC(singleOutputArray, setLoader, setArray)
    expect(setArray).toHaveBeenCalledTimes(0)
  })
})
