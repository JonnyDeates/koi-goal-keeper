import {type TaskType} from "@repo/types";
import React, {type ChangeEventHandler} from "react";
import {FloatingLabelInputWithButton, IconButton, SpacedLabel, SpacedLabelInput} from "koi-pool";
import {handleSubmitEnter} from "@repo/shared";
import {useGoalListContext} from "../../../../contexts/GoalListProvider/GoalListProvider";
import TaskActions from "../../actions/TaskActions";
import check from './assets/check.svg';
import unchecked from './assets/unchecked.svg';
import './Task.css';

function Task({text, isEditing,isCompleted, id, goalId}: TaskType & {
  id: string,
  goalId: string
}) {
  const {applyActionToGoalList} = useGoalListContext();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    applyActionToGoalList(TaskActions.updateTaskText(goalId, id, event.target.value));
  };

  const handleToggleObjectiveEditing = () => {
    applyActionToGoalList(TaskActions.toggleTask(goalId, id, 'isEditing'));
  };

  const handleToggleObjectiveCompleted = () => {
    applyActionToGoalList(TaskActions.toggleTask(goalId, id, 'isCompleted'));
  };

  if (isEditing) {
    return <div className="Task">
      <FloatingLabelInputWithButton onChange={handleInputChange} width='100%' divProps={{className: "TaskInput"}}
                                    onKeyDown={(event) => {
                                      handleSubmitEnter(event, handleToggleObjectiveEditing);

                                    }}
                                    value={text} label="" onClick={handleToggleObjectiveEditing}/>
    </div>;
  }
  return <div className="Task">
    <SpacedLabel label={text} labelProps={{onDoubleClick: handleToggleObjectiveEditing}}>
      <IconButton className={'IconButton'} src={isCompleted ? check : unchecked} alt={''}
                  isActive={isCompleted}
                  variant={'accept'}
                  onClick={handleToggleObjectiveCompleted}/>
    </SpacedLabel>
  </div>;
}

export default Task;
