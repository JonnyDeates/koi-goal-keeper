import './SortControl.css';
import {Button, FloatingLabel, Select, SpacedLabel} from "koi-pool";
import {useGoalListContext} from "../../../contexts/GoalListProvider/GoalListProvider";
import SortActions from "./actions/SortAction";
import {SortType} from "../../../utils/builders/buildSort";

function SortControl() {
  const {applyActionToSort, sort: {type, direction}} = useGoalListContext();

  const handleToggleAscending = () => { applyActionToSort(SortActions.toggleAscending); };
  const handleToggleSortType = (newType: SortType['type']) => { applyActionToSort(SortActions.updateType(newType)); };

  return <div className={"Sort"}>
    <div className={"ButtonGroup"}>
        <FloatingLabel>
          Sort
        </FloatingLabel>
        <Select<SortType['type']> options={['Creation Date', 'Due Date', 'Starred', 'Task Count', 'Tasks Completed']}
                                  selectedOption={type} selectedOptionAttributes={{className: "SelectOption"}}
                                  onClick={handleToggleSortType} />

      <div className="ascending-btns">
        <Button isActive={direction === 'ASC'} className={"ASC"} variant={'accept'} onClick={handleToggleAscending}>
          ASC
        </Button>
        <Button isActive={direction === 'DSC'} className={"DSC"} variant={'cancel'} onClick={handleToggleAscending}>
          DSC
        </Button>
      </div>
    </div>

  </div>;
}

export default SortControl;