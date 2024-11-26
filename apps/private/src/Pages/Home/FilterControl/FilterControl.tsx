import React, {ChangeEvent} from 'react';
import './SortFilter.css';
import {Button, FloatingLabelInput, SpacedLabel} from "koi-pool";
import {useGoalListContext} from "../../../contexts/GoalListProvider/GoalListProvider";
import FilterActions from "./actions/FilterActions";



function FilterControl() {
  const {
    applyActionToFilter,
    filter: {showAllIncludingPastDue, showCompletedGoals, showOnlyStarred, searchText}
  } = useGoalListContext();

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
  return <SpacedLabel label="Filter" className={"Sort"}>
    <div className={"ButtonGroup"}>

      <Button onClick={handleToggleAllIncludingPastDue} variant={'accept'}
              isActive={showAllIncludingPastDue}>
        Show Past Due Goals
      </Button>
      <Button onClick={handleToggleShowCompletedGoals} variant={'accept'}
              isActive={showCompletedGoals}>

        Show Completed Goals
      </Button>
      <Button onClick={handleToggleShowOnlyStarred} variant={'accept'}
              isActive={showOnlyStarred}>
        Show Starred Only
      </Button>
      <FloatingLabelInput width={200} label={"Search"} onChange={handleUpdateSearchText} value={searchText}/>
    </div>

  </SpacedLabel>;
}

export default FilterControl;