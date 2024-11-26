import {type TaskType} from "@repo/types";
import React, {type ChangeEventHandler, type KeyboardEvent} from "react";
import {FloatingLabelInputWithButton, IconButton} from "koi-pool";
import {handleSubmitEnter} from "@repo/shared";
import {useGoalListContext} from "../../../../contexts/GoalListProvider/GoalListProvider";
import TaskActions from "../../actions/TaskActions";
import check from './assets/check.svg';
import unchecked from './assets/unchecked.svg';
import edit from './assets/pencil.svg'
import trash from './assets/trash.svg'
import {findNextElementInListToFocusOn} from "../../../../utils/utils";
import './Task.css';
import TaskClient from "./clients/TaskClient";

function Task({name, isEditing, isCompleted, id, goalId, index, tasksListOfIds}: TaskType & {
    id: number,
    goalId: number,
    isLast: boolean,
    index: number,
    tasksListOfIds: string[]
}) {
    const {applyActionToGoalList, searchResults:{tasksFoundFromSearch}} = useGoalListContext();

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) =>
        applyActionToGoalList(TaskActions.updateTaskText(goalId, id, event.target.value));

    const handleToggleObjectiveEditing = () => {
        applyActionToGoalList(TaskActions.toggleTask(goalId, id, 'isEditing'));
    }

    const handleSaveEntry = () => {
        if (isEditing)
            TaskClient.update(goalId, id, {name}).then(() => {
                if (!isLast) {
                    findNextElementInListToFocusOn(tasksListOfIds, index);
                }
            })
        handleToggleObjectiveEditing()
    }

    const handleToggleObjectiveCompleted = () => {
        TaskClient.update(goalId, id, {isCompleted: !isCompleted}).then(() => {
            applyActionToGoalList(TaskActions.toggleTask(goalId, id, 'isCompleted'));
        });
    }

    const handleTaskBeingRemoved = () => {
        TaskClient.remove(goalId, id).then(() => {
            applyActionToGoalList(TaskActions.remove(goalId, id))
        })
    }

    const handleEnterPress = (event: KeyboardEvent) => handleSubmitEnter(event, handleSaveEntry);

    const isLast = tasksListOfIds.length === index

    if (isEditing) {
        return <div className={`Task ${isEditing ? 'editing' : ''}`}>
            <FloatingLabelInputWithButton onChange={handleInputChange} width='100%' divProps={{className: "TaskInput"}}
                                          onKeyDown={handleEnterPress} id={id.toString()}
                                          value={name} label="" onClick={handleSaveEntry}/>
        </div>;
    }

    return <div className="Task">
        <div>
            <IconButton className={'IconButton'} src={isCompleted ? check : unchecked} alt={''}
                        isActive={isCompleted}
                        variant={'accept'}
                        onClick={handleToggleObjectiveCompleted}/>
            <span onDoubleClick={handleToggleObjectiveEditing} className={tasksFoundFromSearch[id] ? "Highlighted" : ''}>{name}</span>
        </div>
        <div>
            <IconButton className={'IconButton'} src={edit} alt={'edit'}
                        variant={'caution'}
                        onClick={handleToggleObjectiveEditing}/>

            <IconButton className={'IconButton'}
                        src={trash}
                        alt={''}
                        variant={'cancel'}
                        onClick={handleTaskBeingRemoved}/>
        </div>
    </div>;
}

export default Task;
