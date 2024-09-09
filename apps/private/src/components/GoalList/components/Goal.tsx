import {GoalType, ObjectiveType} from "@repo/types";
import React, {SetStateAction} from "react";
import {Button, CloseButton} from "koi-pool";
import Select from "../../Select/Select";
import {GoalListType} from "../GoalList";
import Objective from "./Objective";
import ObjectiveActions from "../actions/ObjectiveActions";
import {useGoalListContext} from "../../../contexts/GoalListProvider";
import GoalActions from "../actions/GoalActions";

type GoalProps = GoalType & { id: string }

const Goal = ({id, createdDate, modifiedDate, completionDate, objectives}: GoalProps) => {
    const {applyActionToGoalList} = useGoalListContext()

    const objectiveListOfIds = Object.keys(objectives)

    const handleAddObjective = () => {
        applyActionToGoalList(ObjectiveActions.createNewObjective(id))
    }

    const handleUpdateDueDate = (value: number) => {
        applyActionToGoalList(GoalActions.updateGoalDueDate(id, value))
    }

    return <div className='Goal'>
        <CloseButton/>
        <h3>Due Date: {completionDate.toDateString()}</h3>

        <Select options={{"Today": 0, "Tomorrow": 1, "Week": 7, "Month": 30, "Quarter": 90, "6-Month": 180, "1 Year": 365, "Custom": Infinity}}
                selectedOption={"Today"} onClick={handleUpdateDueDate}/>


        {objectiveListOfIds.map((objectiveId) =>
            <React.Fragment key={objectiveId}>
                <Objective id={objectiveId}
                           goalId={id}
                           {...(objectives[objectiveId] as ObjectiveType)} />
            </React.Fragment>
        )}
        <div className={'GoalActions'}>
            <Button onClick={handleAddObjective}>Add Objective</Button>
        </div>
    </div>
}
export default Goal