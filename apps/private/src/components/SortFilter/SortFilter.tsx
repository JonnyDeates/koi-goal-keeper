import React from 'react';
import './SortFilter.css';
import {Button, SpacedLabel} from "koi-pool";
import {useGoalListContext} from "../../contexts/GoalListProvider/GoalListProvider";
import SortActions from "./actions/SortAction";

function SortFilter() {
  const {applyActionToSort, sort: {type, direction}} = useGoalListContext();

  const handleToggleAscending = () => { applyActionToSort(SortActions.toggleAscending); };
  const handleToggleSortType = () => { applyActionToSort(SortActions.toggleType); };

  return <SpacedLabel label="Sort">
    <Button onClick={handleToggleSortType}>{type}</Button>
    <div className="ascending-btns">
      <Button isActive={direction === 'ASC'} onClick={handleToggleAscending}>
        ASC
      </Button>
      <Button isActive={direction === 'DSC'} onClick={handleToggleAscending}>
        DES
      </Button>
    </div>
  </SpacedLabel>;
}
export default SortFilter;