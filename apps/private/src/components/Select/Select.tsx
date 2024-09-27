import React, {type ReactNode, useState} from "react";
import "./Select.css";
import {handleSubmitEnter} from "@repo/shared";

interface OptionProps<T> {
  children: ReactNode,
  value: T,
  onClick: (value: T) => void,
  isActive: boolean,
  key: string
}

function Option<T, >({children, value, onClick, isActive}: OptionProps<T>) {

  const handleClick = () => {
    onClick(value);
  };
  const activeClassname = isActive ? 'active' : '';

  return <div className={`Option ${activeClassname}`} role='option' onClick={handleClick} aria-selected={isActive}
              tabIndex={0}
              onKeyDown={(event) => {
                handleSubmitEnter(event, handleClick);
              }}>
    {children}
  </div>;
}

export interface SelectProps<T> {
  options: Record<string, T> | T[],
  selectedOption: string,
  onClick: (value: T) => void
}

function Select<T extends string | number | symbol, >({options, selectedOption, onClick}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [startClosingAnimation, setStartClosingAnimation] = useState<boolean>(false);
  const handleOpenSelect = () => {
    if (isOpen) {
      setStartClosingAnimation(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    } else {
      setIsOpen(true);
      setStartClosingAnimation(false);
    }
  };

  const opacity = startClosingAnimation ? 0 : 1;
  const transform = startClosingAnimation ? 'scale(0.9,0.3)' : 'none';


  return <div className="SelectContainer">
    <div className="SelectedOption" onClick={handleOpenSelect} role="button"
         tabIndex={0}
         onKeyDown={(event) => {
           handleSubmitEnter(event, handleOpenSelect);
         }}>
      {selectedOption}
    </div>
    {isOpen ?
      <>
        <div className="Backdrop" onClick={handleOpenSelect} role="presentation"
             onKeyDown={(event) => {
               handleSubmitEnter(event, handleOpenSelect);
             }}/>
        <div className="Select" style={{opacity, transform}}>
          {
            Array.isArray(options)
              ? options.map((option) =>
                <Option key={`Option-${option.toString()}`} value={option} onClick={onClick}
                        isActive={option === selectedOption}>
                  {option as ReactNode}
                </Option>)
              : Object.keys(options).map((option) =>
                <Option key={`Option-${option}`} value={options[option]} onClick={onClick}
                        isActive={option === selectedOption}>
                  {option}
                </Option>)
          }
        </div>
      </>
      : <></>
    }
  </div>;
};

export default Select;