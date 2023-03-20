import React from 'react';
import { Button } from "./button";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

const text = 'Test passed'

describe('Testing button component', () => {
  it('button with text', () => {
    const tree = renderer.create( <Button text={text} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('button without text', () => {
    const tree = renderer.create( <Button />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('inactive button', () => {
    const tree = renderer.create( <Button disabled={true} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('loader on button', () => {
    const tree = renderer.create( <Button isLoader={true} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Onclick is working correctly', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick} text={text}/>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})

