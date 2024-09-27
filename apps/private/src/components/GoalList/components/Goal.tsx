import {type GoalType} from "@repo/types";
import React from "react";
import {Button, CloseButton} from "koi-pool";
import Select from "../../Select/Select";
import TaskActions from "../actions/TaskActions";
import {useGoalListContext} from "../../../contexts/GoalListProvider/GoalListProvider";
import GoalActions from "../actions/GoalActions";
import {allDueDates, type DUE_DATE, getDueDateFromDate} from "../../../utils/utils";
import Tasks from "./Task";

type GoalProps = GoalType & { id: string }

function Goal({id, completionDate, tasks, tasksCompleted}: GoalProps) {
  const {applyActionToGoalList} = useGoalListContext();

  const tasksListOfIds = Object.keys(tasks);

  const handleAddObjective = () => {
    applyActionToGoalList(TaskActions.create(id));
  };

  const handleDuplicateGoal = () => {
    applyActionToGoalList(GoalActions.duplicate(id));
  };

  const handleUpdateDueDate = (value: number) => {
    applyActionToGoalList(GoalActions.updateGoalDueDate(id, value));
  };

  const handleDeleteGoal = () => {
    applyActionToGoalList(GoalActions.remove(id));
  };


  return <div className='Goal'>
    <CloseButton onClick={handleDeleteGoal}/>
    <h3>Due: {completionDate.toDateString()} </h3>

    <div className='GoalHeader'>
      <Select<DUE_DATE> options={allDueDates()}
                        selectedOption={getDueDateFromDate(completionDate)} onClick={handleUpdateDueDate}/>
      <h3>Tasks Completed: {tasksCompleted}</h3>
    </div>

    {tasksListOfIds.map((taskId) =>
      <React.Fragment key={taskId}>
        {tasks[taskId] ?
        <Tasks id={taskId}
               goalId={id}
               {...(tasks[taskId])} />
        : <></>
        }
      </React.Fragment>
    )}
    <div className="GoalActions">
      <Button onClick={handleDuplicateGoal}>Duplicate Goal</Button>
      <Button onClick={handleAddObjective}>Add Objective</Button>
    </div>
  </div>;
}

export default Goal;