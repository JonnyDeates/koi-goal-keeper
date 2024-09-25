import React, {ReactNode, useState} from "react";
import "./Select.css"

type OptionProps<T> = { children: ReactNode, value: T, onClick: (value: T) => void, isActive: boolean, key: any }

const Option = <T, >({children, value, onClick, isActive}: OptionProps<T>) => {

  const handleClick = () => {
    onClick(value);
  };
  const activeClassname = isActive ? 'active' : '';

  return <div className={`Option ${activeClassname}`} onClick={handleClick}>
    {children}
  </div>
};

export type SelectProps<T> = {
  options: Record<string, T> | T[],
  selectedOption: string,
  onClick: (value: T) => void
}

const Select = <T extends string | number | symbol, >({options, selectedOption, onClick}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [startClosingAnimation, setStartStartClosingAnimation] = useState<boolean>(false);
  const handleOpenSelect = () => {
    if (isOpen) {
      setStartStartClosingAnimation(true);
      setTimeout(() => setIsOpen(false), 300);
    } else {
      setIsOpen(true);
      setStartStartClosingAnimation(false);
    }
  };

  const opacity = startClosingAnimation ? 0 : 1;
  const transform = startClosingAnimation ? 'scale(0.9,0.3)' : 'none';


  if (Array.isArray(options)) {
    return <div className="SelectContainer">
      <div className={"SelectedOption"} onClick={handleOpenSelect}>
        {selectedOption}
      </div>
      {isOpen ?
        <>
          <div className={"Backdrop"} onClick={handleOpenSelect}/>
          <div className={"Select"} style={{opacity, transform}}>
            {options.map((option) =>
              <Option key={'Option-' + option} value={option} onClick={onClick} isActive={option === selectedOption}>
                {option as ReactNode}
              </Option>)}
          </div>
        </>
        : <></>
      }
    </div>
  }

  const optionKeys = Object.keys(options);

  return <div className="SelectContainer">
    <div className={"SelectedOption"} onClick={handleOpenSelect}>
      {selectedOption}
    </div>
    {isOpen ?
      <>
        <div className={"Backdrop"} onClick={handleOpenSelect}/>
        <div className={"Select"} style={{opacity, transform}}>
          {optionKeys.map((option) =>
            <Option key={'Option-' + option} value={options[option] as T} onClick={onClick} isActive={option === selectedOption}>
              {option}
            </Option>)}
        </div>
      </>
      : <></>
    }
  </div>
}
export default Select;