import {ObjectiveType} from "@repo/types";
import React, {ChangeEventHandler} from "react";
import {FloatingLabelInputWithButton, SpacedLabelInput} from "koi-pool";
import {handleSubmitEnter} from "@repo/shared";
import ObjectiveActions from "../actions/ObjectiveActions";
import {useGoalListContext} from "../../../contexts/GoalListProvider";

const Objective = ({text, isEditing,isCompleted, id, goalId}: ObjectiveType & {
  id: string,
  goalId: string
}) => {
  const {applyActionToGoalList} = useGoalListContext()

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    applyActionToGoalList(ObjectiveActions.updateObjective(goalId, id, event.target.value))
  };

  const handleToggleObjectiveEditing = () => {
    applyActionToGoalList(ObjectiveActions.toggleEditingObjective(goalId, id, 'isEditing'));
  };

  const handleToggleObjectiveCompleted = () => {
    applyActionToGoalList(ObjectiveActions.toggleEditingObjective(goalId, id, 'isCompleted'));
  };

  if (isEditing) {
    return <div className={'Objective'}>
      <FloatingLabelInputWithButton onChange={handleInputChange} width='100%' divProps={{className: "ObjectiveInput"}}
                                    onKeyDown={(event) => handleSubmitEnter(event, handleToggleObjectiveEditing)}
                                    value={text} label={""} onClick={handleToggleObjectiveEditing}/>
    </div>
  }
  return <div className={'Objective'}>
    <SpacedLabelInput label={text} labelProps={{onDoubleClick: handleToggleObjectiveEditing}}
                      onChange={handleToggleObjectiveCompleted} checked={isCompleted}
                      type={'checkbox'}/>
  </div>
}
export default Objective