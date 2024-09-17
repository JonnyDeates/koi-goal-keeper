import {GoalType, ObjectiveType} from "@repo/types";
import React from "react";
import {Button, CloseButton} from "koi-pool";
import Select from "../../Select/Select";
import Objective from "./Objective";
import ObjectiveActions from "../actions/ObjectiveActions";
import {useGoalListContext} from "../../../contexts/GoalListProvider";
import GoalActions from "../actions/GoalActions";
import {allDueDates, DUE_DATE, getDueDateFromDate} from "../../../utils/utils";

type GoalProps = GoalType & { id: string }

const Goal = ({id, createdDate, modifiedDate, completionDate, objectives}: GoalProps) => {
  const {applyActionToGoalList} = useGoalListContext()

  const objectiveListOfIds = Object.keys(objectives)

  const handleAddObjective = () => {
    applyActionToGoalList(ObjectiveActions.createNewObjective(id))
  };

  const handleUpdateDueDate = (value: number) => {
    applyActionToGoalList(GoalActions.updateGoalDueDate(id, value))
  };

  const tasksCompleted = objectiveListOfIds.reduce((count, objectiveId) => {
    if(objectives[objectiveId] && objectives[objectiveId].isCompleted)
      return  count + 1;
    return count;
  },0);

  return <div className='Goal'>
    <CloseButton/>

    <div className='GoalHeader'>
      <h3>Due: {completionDate.toDateString()} </h3>
      <Select<DUE_DATE> options={allDueDates()}
                        selectedOption={getDueDateFromDate(completionDate)} onClick={handleUpdateDueDate}/>
      <h3>Tasks Completed: {tasksCompleted}</h3>
    </div>

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
};
export default Goal