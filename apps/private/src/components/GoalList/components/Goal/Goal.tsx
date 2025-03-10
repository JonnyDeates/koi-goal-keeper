import {DUE_DATE, type GoalType, TaskType} from "@repo/types";
import React from "react";
import {Button, IconButton, Select,} from "koi-pool";
import TaskActions from "../../actions/TaskActions";
import {useGoalListContext} from "../../../../contexts/GoalListProvider/GoalListProvider";
import GoalActions from "../../actions/GoalActions";
import {
    allDueDatesOfSelectedOption,
    ColorSelection,
    getDateFromDueDate,
    getDueDateFromDate
} from "../../../../utils/utils";
import Tasks from "../Task/Task";
import star from './assets/star.svg'
import starOutline from './assets/star_outline.svg'
import './Goal.css';
import GoalHeader from "./components/GoalHeader";
import GoalActionGroup from "./components/GoalActionGroup";
import GoalDeleteButton from "./components/GoalDeleteModal";
import GoalClient from "./clients/GoalClient";
import TaskClient from "../Task/clients/TaskClient";
import {useSettings} from "../../../../contexts/SettingsProvider/SettingsProvider";

function Goal(currentGoal: GoalType) {
    const {id, completionDate, isFavorite, tasks, name} = currentGoal;
    const {user: {selectedDueDate}} = useSettings();
    const {applyActionToGoalList} = useGoalListContext();

    const taskListOfIds = Object.keys(tasks);

    const handleUpdateDueDate = (value: DUE_DATE) => {
        const formatedDueDate = getDateFromDueDate(value);

        GoalClient.update(id, {completionDate: formatedDueDate}).then(() => {
                applyActionToGoalList(GoalActions.updateDueDate(id, formatedDueDate))
        })
    };
    const handleToggleGoalEditing = () => applyActionToGoalList(GoalActions.toggleEditing(id, 'isEditing'));
    const handleToggleGoalFavorite = () => {
        GoalClient.update(id, {isFavorite: !isFavorite})
            .then((response) => {
            if (response && response.status === 200)
                applyActionToGoalList(GoalActions.toggleEditing(id, 'isFavorite'));
        })
    };
    const handleAddTask = () => {
        TaskClient.create(id)
            .then((response) => {
            if(response && response.data && response.data.task){
                applyActionToGoalList(TaskActions.create(id, response.data.task));
            }
        })
    };

    const selectedOption = getDueDateFromDate(selectedDueDate, completionDate);

    return <div className='Goal'>
        <div className={'TopIndicator'} style={ColorSelection['Default'][selectedOption]}/>
        <Select<DUE_DATE>
            containerAttributes={{className: 'Select'}}
            selectedOptionAttributes={{
                className: 'SelectedOption',
                style: {color: ColorSelection['Default'][selectedOption].backgroundColor}
            }}
            options={allDueDatesOfSelectedOption(selectedDueDate)} optionAttributes={{}
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
                    <Tasks tasksListOfIds={taskListOfIds} index={index}
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