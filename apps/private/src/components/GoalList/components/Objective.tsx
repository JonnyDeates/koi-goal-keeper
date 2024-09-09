import {ObjectiveType} from "@repo/types";
import React, {ChangeEventHandler, SetStateAction} from "react";
import {FloatingLabelInputWithButton} from "koi-pool";
import {handleSubmitEnter} from "@repo/shared";
import ObjectiveActions from "../actions/ObjectiveActions";
import {useGoalListContext} from "../../../contexts/GoalListProvider";

const Objective = ({text, isEditing, id, goalId}: ObjectiveType & {
    id: string,
    goalId: string
}) => {
    const {applyActionToGoalList} = useGoalListContext()

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        applyActionToGoalList(ObjectiveActions.updateObjective(goalId, id, event.target.value))
    }

    const handleToggleObjectiveEditing = () => {
        applyActionToGoalList(ObjectiveActions.toggleEditingObjective(goalId, id));
    }

    if (isEditing) {
        return <div className={'Objective'}>
            <FloatingLabelInputWithButton onChange={handleInputChange} width='100%' divProps={{className: "ObjectiveInput"}}
                                          onKeyDown={(event) => handleSubmitEnter(event, handleToggleObjectiveEditing)}
                                          value={text} label={""} onClick={handleToggleObjectiveEditing}/>
        </div>
    }
    return <div className={'Objective'}>
        <p onDoubleClick={handleToggleObjectiveEditing}>
            {text}
        </p>
    </div>
}
export default Objective