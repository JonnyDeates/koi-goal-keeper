import React from 'react';
import './SortFilter.css';
import {Button, SpacedLabel} from "koi-pool";
import {useGoalListContext} from "../../contexts/GoalListProvider/GoalListProvider";
import SortActions from "./actions/SortAction";

function SortFilter() {
  const {applyActionToSort, sort: {type, direction}} = useGoalListContext();

  const handleToggleAscending = () => { applyActionToSort(SortActions.toggleAscending); };
  const handleToggleSortType = () => { applyActionToSort(SortActions.toggleType); };

  return <SpacedLabel label="Sort" className={"Sort"}>
    <div className={"ButtonGroup"}>

    <Button onClick={handleToggleSortType}>{type}</Button>
    <div className="ascending-btns">
      <Button isActive={direction === 'ASC'} className={"ASC"} variant={'accept'} onClick={handleToggleAscending}>
        ASC
      </Button>
      <Button isActive={direction === 'DSC'} className={"DSC"} variant={'cancel'} onClick={handleToggleAscending}>
        DSC
      </Button>
    </div>
    </div>

  </SpacedLabel>;
}
export default SortFilter;