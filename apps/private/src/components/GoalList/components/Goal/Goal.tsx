import {type GoalType, TaskType} from "@repo/types";
import React from "react";
import {Button, IconButton, Select,} from "koi-pool";
import TaskActions from "../../actions/TaskActions";
import {useGoalListContext} from "../../../../contexts/GoalListProvider/GoalListProvider";
import GoalActions from "../../actions/GoalActions";
import {allDueDates, ColorSelection, type DUE_DATE, getDueDateFromDate} from "../../../../utils/utils";
import Tasks from "../Task/Task";
import star from './assets/star.svg'
import starOutline from './assets/star_outline.svg'
import './Goal.css';
import GoalHeader from "./components/GoalHeader";
import GoalActionGroup from "./components/GoalActionGroup";
import GoalDeleteButton from "./components/GoalDeleteModal";

type GoalProps = GoalType & { id: string }

function Goal(currentGoal: GoalProps) {
  const {id, completionDate, isFavorite, tasks, name} = currentGoal;
  const {applyActionToGoalList} = useGoalListContext();

  const taskListOfIds = Object.keys(tasks);

  const handleUpdateDueDate = (value: DUE_DATE) => applyActionToGoalList(GoalActions.updateDueDate(id, value))
  const handleToggleGoalEditing = () => applyActionToGoalList(GoalActions.toggleEditing(id, 'isEditing'));
  const handleToggleGoalFavorite = () => applyActionToGoalList(GoalActions.toggleEditing(id, 'isFavorite'));
  const handleAddTask = () => applyActionToGoalList(TaskActions.create(id));


  const selectedOption = getDueDateFromDate(completionDate);


  return <div className='Goal'>
    <div className={'TopIndicator'} style={ColorSelection['Default'][selectedOption]}/>
    <Select<DUE_DATE>
      containerAttributes={{className: 'Select'}}
      selectedOptionAttributes={{
        className: 'SelectedOption',
        style: {color: ColorSelection['Default'][selectedOption].backgroundColor}
      }}
      options={allDueDates()} optionAttributes={{}
      // {style: ((option) => ({...ColorSelection['Default'][option]}))}
    }
      selectedOption={selectedOption} onClick={handleUpdateDueDate}/>
    <GoalDeleteButton id={id} name={name} taskListOfIds={taskListOfIds}/>
    <IconButton className={'FavoriteButton'} src={isFavorite ? star : starOutline}
                alt={'Star'} variant={'standard'} isActive={isFavorite} title={'Favorite Goal'}
                style={{backgroundColor: isFavorite ? ColorSelection['Default'][selectedOption].backgroundColor : ''}}
                onClick={handleToggleGoalFavorite}/>
    <GoalHeader {...currentGoal} handleToggleGoalEditing={handleToggleGoalEditing} tasksListOfIds={taskListOfIds}/>
    <GoalActionGroup {...currentGoal} taskListOfIds={taskListOfIds}
                     handleToggleGoalEditing={handleToggleGoalEditing}/>
    <div>
      {taskListOfIds.map((taskId, index) =>
        <React.Fragment key={taskId}>
          <Tasks id={taskId} tasksListOfIds={taskListOfIds} index={index}
                 goalId={id} isLast={index === taskListOfIds.length}
                 {...(tasks[taskId]) as TaskType} />
        </React.Fragment>
      )}
    </div>
    <div className={'BottomIndicator'} style={ColorSelection['Default'][selectedOption]}/>
    <Button className="AddTask" onClick={handleAddTask}>Add Task</Button>
  </div>;
}

export default Goal;