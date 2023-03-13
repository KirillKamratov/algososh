import { reverse } from "./string-algorithms";
import {ElementStates} from "../../types/element-states";

const even = 'even'
const odd = 'odd'

const evenResult = [
  {
    state: ElementStates.Modified,
    value: 'n'
  },

  {
    state: ElementStates.Modified,
    value: 'e'
  },
  {
    state: ElementStates.Modified,
    value: 'v'
  },
  {
    state: ElementStates.Modified,
    value: 'e'
  }
]

const oddResult = [
  {
    state: ElementStates.Modified,
    value: 'd'
  },

  {
    state: ElementStates.Modified,
    value: 'd'
  },
  {
    state: ElementStates.Modified,
    value: 'o'
  }
]

describe('Testing string-reverse algorithm', () => {
  it('string with even letters quantity', () => {
    const tree = reverse(even, () => {})
    expect(tree).toEqual(evenResult)
  })

  it('string with odd letters quantity', () => {
    const tree = reverse(odd, () => {})
    expect(tree).toEqual(oddResult)
  })

  it('string with single letter', () => {
    const tree = reverse('1', () => {})
    expect(tree).toEqual([{
      state: ElementStates.Modified,
      value: '1'
    }])
  })

  it('empty string', () => {
    const tree = reverse('', () => {})
    expect(tree).toEqual([])
  })
})


