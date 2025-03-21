import {ChangeEvent, useRef, useState} from 'react';
import './FilterControl.css';
import {Button, CheckedButton, FloatingLabel, FloatingLabelInput, Select} from "koi-pool";
import {useGoalListContext} from "../../../contexts/GoalListProvider/GoalListProvider";
import FilterActions from "./actions/FilterActions";
import {createPortal} from "react-dom";
import search from './assets/search.svg'

function FilterControl() {
  const {
    applyActionToFilter,
    filter: {showAllIncludingPastDue, showCompletedGoals, showOnlyStarred, searchText}
  } = useGoalListContext();
  const [isDropdownVisible, setIsDropDownVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null)

  const handleToggleAllIncludingPastDue = () => {
    applyActionToFilter(FilterActions.toggle('showAllIncludingPastDue'));
  };
  const handleToggleShowCompletedGoals = () => {
    applyActionToFilter(FilterActions.toggle('showCompletedGoals'));
  };
  const handleToggleShowOnlyStarred = () => {
    applyActionToFilter(FilterActions.toggle('showOnlyStarred'));
  };
const handleUpdateSearchText = (e: ChangeEvent<HTMLInputElement>) => {
  applyActionToFilter(FilterActions.updateSearchText(e.target.value))
}

const handleToggleDropdownMenu = ()=> {
  setIsDropDownVisible((prevState)=>!prevState);
}
  const pastDueApplied = showAllIncludingPastDue ? 'Past Due': ''
  const completedApplied = showCompletedGoals ? 'Completed Goals' : ''
  const starOnlyApplied = showOnlyStarred ? 'Only Starred' : '';

  const filtersApplied = [pastDueApplied, completedApplied, starOnlyApplied].filter((x)=> !!x).join(', ');

  return <>
  <div className={"MultiSelect"} ref={ref}>
    <FloatingLabel className={'FloatingLabel'}>
      Filters Active
    </FloatingLabel>
    <Button onClick={handleToggleDropdownMenu} >
      {filtersApplied.length === 0 ? 'None' : filtersApplied}
    </Button>
    {isDropdownVisible && ref.current && createPortal(<>
    <div className={"Dropdown"} style={{left: ref.current.getBoundingClientRect().left,
      top: ref.current.getBoundingClientRect().top  + window.scrollY + ref.current.offsetHeight}}>
      <CheckedButton onClick={handleToggleAllIncludingPastDue} variant={'accept'}
              isActive={showAllIncludingPastDue}>
        Show Past Due
      </CheckedButton>
      <CheckedButton onClick={handleToggleShowCompletedGoals} variant={'accept'}
              isActive={showCompletedGoals}>

        Show Completed
      </CheckedButton>
      <CheckedButton onClick={handleToggleShowOnlyStarred} variant={'accept'}
              isActive={showOnlyStarred}>
        Show Starred Only
      </CheckedButton>

    </div>
      <div className={'Backdrop'} onClick={handleToggleDropdownMenu}/>
    </>, document.body)}
  </div>

    <FloatingLabelInput width={'200px'} style={{padding: '16px 32px 16px 16px'}}
                        label={"Search"} onChange={handleUpdateSearchText} value={searchText}>

      <div className={'SearchEndAdornment'}>
        <img src={search} alt={''}/>
      </div>
    </FloatingLabelInput>
  </>
}

export default FilterControl;