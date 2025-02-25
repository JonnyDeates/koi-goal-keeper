import React from 'react';
import {IconButton} from "koi-pool";
import checkAll from "../assets/confirm_check.svg";
import uncheckAll from "../assets/remove_check.svg";
import edit from "../assets/pencil.svg";
import copy from "../assets/copy.svg";
import trash from "../assets/archive.ico";
import {GoalType, TaskType} from "@repo/types";
import TaskActions from "../../../actions/TaskActions";
import {useGoalListContext} from "../../../../../contexts/GoalListProvider/GoalListProvider";
import GoalActions from "../../../actions/GoalActions";
import TaskClient from "../../Task/clients/TaskClient";
import GoalClient from "../clients/GoalClient";

type GoalActionGroupProps = GoalType & { taskListOfIds: string[], handleToggleGoalEditing: () => void }

const GoalActionGroup = ({tasks, id, taskListOfIds, handleToggleGoalEditing}: GoalActionGroupProps) => {
    const {applyActionToGoalList} = useGoalListContext();

    const handleToggleAllTasks = () => {

        TaskClient.toggleAll(id).then((response) => {

            if (response && response.data && response.data.taskList)
                applyActionToGoalList(TaskActions.toggleAllTasks(id, response.data.taskList));
        })
    }
    const handleDuplicateGoal = () => {
        GoalClient.duplicate(id).then((response) => {
            if (response && response.data && response.data.duplicatedGoal)
                applyActionToGoalList(GoalActions.create(response.data.duplicatedGoal));
        })
    }


    const isEveryTaskComplete = taskListOfIds.every((taskId) => {
        const taskBeingChecked = tasks[taskId] as TaskType;

        return taskBeingChecked.isCompleted
    })

    return (
        <div className='Subheader'>

            <IconButton className={'IconButton'}
                        src={isEveryTaskComplete ? checkAll : uncheckAll}
                        alt={'Reset Objectives'}
                        isActive={isEveryTaskComplete}
                        variant={'accept'} title={'Toggle goal tasks'}
                        onClick={handleToggleAllTasks}/>
            <IconButton className={'IconButton'} src={edit} alt={'Edit'}
                        variant={'accept'} title={'Edit goal'}
                        onClick={handleToggleGoalEditing}/>

            <IconButton className={'IconButton'} src={copy} alt={'Duplicate'}
                        variant={'accept'} title={'Duplicate goal'}
                        onClick={handleDuplicateGoal}/>

            <IconButton className={'IconButton'} src={trash} alt={'Archive'}
                        variant={'caution'} onClick={handleDuplicateGoal}/>
        </div>
    );
};

export default GoalActionGroup;