import React, { useMemo, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import listStyles from './list.module.css'
import { LinkedList } from "./list";
import { ElementStates } from "../../types/element-states";
import { IInitialList } from "../../types/list";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { ArrowIcon } from "../ui/icons/arrow-icon";


export const ListPage: React.FC = () => {

  const [ inputValue, setInputValue ] = useState("");
  const [ inputIndex, setInputIndex ] = useState("");
  const [ array, setArray ] = useState(new LinkedList<IInitialList>());
  const [ disabled, setDisabled ] = useState(false);
  const [ disabledByIndex, setDisabledByIndex ] = useState(false);
  const [ addHeadLoader, setAddHeadLoader ] = useState(false);
  const [ addTailLoader, setAddTailLoader ] = useState(false);
  const [ deleteHeadLoader, setDeleteHeadLoader ] = useState(false);
  const [ deleteTailLoader, setDeleteTailLoader ] = useState(false);
  const [ deleteByIndexLoader, setDeleteByIndexLoader ] = useState(false);
  const [ addByIndexLoader, setAddByIndexLoader ] = useState(false);
  const [circles, setCircles] = useState(
    <div className={listStyles.list}></div>
  );

  let tempArray: (IInitialList | null)[] = [];

  const initialArray = [0, 34, 8, 1].map((element) => ({
    value: String(element),
    state: ElementStates.Default,
  }));

  const listValues = useMemo(() => array.toArray(), [array]);
  const inputIsEmpty = useMemo(() => inputValue.length === 0, [inputValue]);
  const indexInputIsEmpty = useMemo(
    () => inputIndex.length === 0,
    [inputIndex]
  );
  const linkedListIsEmpty = useMemo(
    () => listValues.length === 0,
    [listValues]
  );

  useEffect(() => {
    setArray(new LinkedList(initialArray));
  }, [setArray]);

  useEffect(() => {
    let temp = Number(inputIndex);
    if(temp < 0 || temp > (array.getSize() -1) || isNaN(temp)){
      setDisabledByIndex(true);
    } else {setDisabledByIndex(false)}
  }, [inputIndex, array]);

  useEffect(() => {
    tempArray = array.toArray();
    renderCircles();
  }, [array]);

  const addToHead = async () => {
    setInputValue("");
    setDisabled(true);
    setAddHeadLoader(true);

    const head = array.getHead();
    if (head) {
      head.value.head = inputValue;
    }
    setArray(new LinkedList(array.toArray()));
    await delay(SHORT_DELAY_IN_MS);
    if (head) {
      head.value.head = undefined;
    }
    const item = { value: inputValue, state: ElementStates.Modified };
    array.prepend(item);
    setArray(new LinkedList(array.toArray()));
    await delay(SHORT_DELAY_IN_MS);
    item.state = ElementStates.Default;
    setArray(new LinkedList(array.toArray()));
    setDisabled(false);
    setAddHeadLoader(false);
  };

  const append = async () => {
    setDisabled(true);
    setInputValue("");
    setAddTailLoader(true);
    const tail = array.getTail();
    if (tail) {
      tail.value.head = inputValue;
    }
    setArray(new LinkedList(array.toArray()));
    await delay(SHORT_DELAY_IN_MS);

    if (tail) {
      tail.value.head = undefined;
    }
    const item = { value: inputValue, state: ElementStates.Modified };
    array.append(item);
    setArray(new LinkedList(array.toArray()));
    await delay(SHORT_DELAY_IN_MS);
    item.state = ElementStates.Default;
    setArray(new LinkedList(array.toArray()));
    setDisabled(false);
    setAddTailLoader(false);
  };

  const removeHead = async () => {
    setDisabled(true);
    setDeleteHeadLoader(true);
    const head = array.getHead();
    if (head) {
      head.value.head = head.value.value;
      head.value.value = "";
    }
    setArray(new LinkedList(array.toArray()));
    await delay(SHORT_DELAY_IN_MS);
    array.removeHead();
    setArray(new LinkedList(array.toArray()));
    setDisabled(false);
    setDeleteHeadLoader(false);
  };

  const removeTail = async () => {
    setDisabled(true);
    setDeleteTailLoader(true);
    const tail = array.getTail();
    if (tail) {
      tail.value.tail = tail.value.value;
      tail.value.value = "";
    }
    setArray(new LinkedList(array.toArray()));
    await delay(SHORT_DELAY_IN_MS);
    array.removeTail();
    setArray(new LinkedList(array.toArray()));
    setDisabled(false);
    setDeleteTailLoader(false);
  };

  const addElementByIndex = async () => {
    setDisabled(true);
    setAddByIndexLoader(true);
    setInputValue("");
    setInputIndex("");
    let item;
    for (let i = 0; i <= Number(inputIndex); i++) {
      if (item) {
        item.state = ElementStates.Changing;
        item.head = undefined;
      }
      item = array.getElementByIndex(i);
      if (item) {
        item.head = inputValue;
      }
      setArray(new LinkedList(array.toArray()));
      await delay(SHORT_DELAY_IN_MS);
    }

    for (let i = 0; i <= Number(inputIndex); i++) {
      const changingItem = array.getElementByIndex(i);
      if (changingItem) {
        changingItem.state = ElementStates.Default;
        if (i === Number(inputIndex)) {
          changingItem.head = undefined;
        }
      }
    }
    const element = { value: inputValue, state: ElementStates.Modified };
    array.addByIndex(element, Number(inputIndex));
    setArray(new LinkedList(array.toArray()));
    await delay(SHORT_DELAY_IN_MS);
    element.state = ElementStates.Default;
    setArray(new LinkedList(array.toArray()));
    setDisabled(false);
    setAddByIndexLoader(false);
  };

  const removeElementByIndex = async () => {
    setDisabled(true);
    setDeleteByIndexLoader(true);
    setInputIndex("");
    for (let i = 0; i <= Number(inputIndex); i++) {
      const item = array.getElementByIndex(i);
      if (item) {
        if (i === Number(inputIndex)) {
          item.tail = item.value;
          item.value = "";
        } else {
          item.state = ElementStates.Changing;
        }
      }
      setArray(new LinkedList(array.toArray()));
      await delay(SHORT_DELAY_IN_MS);
    }
    for (let i = 0; i < Number(inputIndex); i++) {
      const changingItem = array.getElementByIndex(i);
      if (changingItem) {
        changingItem.state = ElementStates.Default;
      }
    }
    array.removeByIndex(Number(inputIndex));
    setArray(new LinkedList(array.toArray()));
    setDisabled(false);
    setDeleteByIndexLoader(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(event.target.value);
  };

  const renderCircles = () => {
    setCircles(
      <ul className={listStyles.list}>
        {tempArray.map((item, index, arr) => {
          return (
            <div className={listStyles.item} key={index}>
              <Circle
                letter={item?.value}
                state={item?.state}
                index={index}
                head={
                  item?.head ? (
                    <Circle
                      letter={item?.head}
                      state={ElementStates.Changing}
                      isSmall
                    />
                  ) : index === 0 ? (
                    HEAD
                  ) : (
                    ""
                  )
                }
                tail={
                  item?.tail ? (
                    <Circle
                      letter={item?.tail}
                      state={ElementStates.Changing}
                      isSmall
                    />
                  ) : index === arr.length - 1 ? (
                    TAIL
                  ) : (
                    ""
                  )
                }
                extraClass={listStyles.item}
              />
              {index !== arr.length - 1 && <span className={listStyles.arrow}>
                <ArrowIcon />
              </span>}
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={listStyles.wrapper}>
        <Input
          isLimitText={true}
          maxLength={4}
          extraClass={listStyles.input}
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text="Добавить в head"
          onClick={addToHead}
          linkedList="small"
          isLoader={addHeadLoader}
          disabled={inputIsEmpty || disabled}
        />
        <Button
          text="Добавить в tail"
          onClick={append}
          linkedList="small"
          isLoader={addTailLoader}
          disabled={inputIsEmpty || disabled}
        />
        <Button
          text="Удалить из head"
          onClick={removeHead}
          linkedList="small"
          isLoader={deleteHeadLoader}
          disabled={linkedListIsEmpty || disabled}
        />
        <Button
          text="Удалить из tail"
          onClick={removeTail}
          linkedList="small"
          isLoader={deleteTailLoader}
          disabled={linkedListIsEmpty || disabled}
        />
      </div>
      <div className={listStyles.wrapper}>
        <Input
          type='number'
          placeholder='Введите индекс'
          extraClass={listStyles.input}
          min={0}
          max={9}
          value={inputIndex}
          onChange={onIndexChange}
        />
        <Button
          text='Добавить по индексу'
          type='button'
          linkedList={'big'}
          onClick={addElementByIndex}
          isLoader={addByIndexLoader}
          disabled={inputIsEmpty || indexInputIsEmpty || disabled || disabledByIndex}
        />
        <Button
          text='Удалить по индексу'
          type={'button'}
          linkedList={'big'}
          onClick={removeElementByIndex}
          isLoader={deleteByIndexLoader}
          disabled={linkedListIsEmpty || indexInputIsEmpty || disabled || disabledByIndex}
        />
      </div>
      {circles}
    </SolutionLayout>
  );
};
