import {TaskType} from "@repo/types";
import React, {ChangeEventHandler} from "react";
import {FloatingLabelInputWithButton, SpacedLabelInput} from "koi-pool";
import {handleSubmitEnter} from "@repo/shared";
import {useGoalListContext} from "../../../contexts/GoalListProvider/GoalListProvider";
import TaskActions from "../actions/TaskActions";

const Task = ({text, isEditing,isCompleted, id, goalId}: TaskType & {
  id: string,
  goalId: string
}) => {
  const {applyActionToGoalList} = useGoalListContext();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    applyActionToGoalList(TaskActions.updateTaskText(goalId, id, event.target.value))
  };

  const handleToggleObjectiveEditing = () => {
    applyActionToGoalList(TaskActions.toggleTask(goalId, id, 'isEditing'));
  };

  const handleToggleObjectiveCompleted = () => {
    applyActionToGoalList(TaskActions.toggleTask(goalId, id, 'isCompleted'));
  };

  if (isEditing) {
    return <div className={'Task'}>
      <FloatingLabelInputWithButton onChange={handleInputChange} width='100%' divProps={{className: "TaskInput"}}
                                    onKeyDown={(event) => handleSubmitEnter(event, handleToggleObjectiveEditing)}
                                    value={text} label={""} onClick={handleToggleObjectiveEditing}/>
    </div>
  }
  return <div className={'Task'}>
    <SpacedLabelInput label={text} labelProps={{onDoubleClick: handleToggleObjectiveEditing}}
                      onChange={handleToggleObjectiveCompleted} checked={isCompleted}
                      type={'checkbox'}/>
  </div>
};

export default Task
