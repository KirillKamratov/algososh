import React from 'react';
import {Circle} from "./circle";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import {ElementStates} from "../../../types/element-states";

describe('Testing circle component', () => {
  it('circle with letters', () => {
    const tree = renderer.create( <Circle letter={'ABC'} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('circle without letters', () => {
    const tree = renderer.create(<Circle />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('circle with head', () => {
    const tree = renderer.create( <Circle head={'head'} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('circle with react-element head', () => {
    const tree = renderer.create( <Circle head={<Circle isSmall={true} />} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('circle with tail', () => {
    const tree = renderer.create( <Circle tail={'tail'} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('circle with react-element tail', () => {
    const tree = renderer.create( <Circle tail={<Circle isSmall={true} />} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('circle with index', () => {
    const tree = renderer.create( <Circle index={0} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('small circle', () => {
    const tree = renderer.create( <Circle isSmall={true} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('circle in default state', () => {
    const tree = renderer.create( <Circle state={ElementStates.Default}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('circle in changing state', () => {
    const tree = renderer.create( <Circle state={ElementStates.Changing} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('circle in modified state', () => {
    const tree = renderer.create( <Circle state={ElementStates.Modified} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
