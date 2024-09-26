import React from 'react'
import './SortFilter.css'
import {useGoalListContext} from "../../contexts/GoalListProvider/GoalListProvider";
import {Button, SpacedLabel} from "koi-pool";
import SortActions from "./actions/SortAction";

const SortFilter = () => {
  const {applyActionToSort, sort: {type, direction}} = useGoalListContext();

  const handleToggleAscending = () => applyActionToSort(SortActions.toggleAscending);
  const handleToggleSortType = () => applyActionToSort(SortActions.toggleType);

  return <SpacedLabel label={'Sort'}>
    <Button onClick={handleToggleSortType}>{type}</Button>
    <div className={'ascending-btns'} onClick={handleToggleAscending}>
      <Button isActive={direction === 'ASC'}>
        ASC
      </Button>
      <Button isActive={direction === 'DSC'}>
        DES
      </Button>
    </div>
  </SpacedLabel>
};
export default SortFilter;