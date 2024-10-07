import {type TaskType} from "@repo/types";
import React, {type ChangeEventHandler, type KeyboardEvent} from "react";
import {FloatingLabelInputWithButton, IconButton, SpacedLabel, SpacedLabelInput} from "koi-pool";
import {handleNextFocusEnter, handleSubmitEnter} from "@repo/shared";
import {useGoalListContext} from "../../../../contexts/GoalListProvider/GoalListProvider";
import TaskActions from "../../actions/TaskActions";
import check from './assets/check.svg';
import unchecked from './assets/unchecked.svg';
import edit from './assets/pencil.svg'
import trash from './assets/trash.svg'
import './Task.css';
import {findNextElementInListToFocusOn} from "../../../../utils/utils";

function Task({text, isEditing, isCompleted, id, goalId, index, tasksListOfIds}: TaskType & {
    id: string,
    goalId: string,
    isLast: boolean,
    index: number,
    tasksListOfIds: string[]
}) {
    const {applyActionToGoalList} = useGoalListContext();

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) =>
        applyActionToGoalList(TaskActions.updateTaskText(goalId, id, event.target.value));

    const handleToggleObjectiveEditing = () =>
        applyActionToGoalList(TaskActions.toggleTask(goalId, id, 'isEditing'));

    const handleToggleObjectiveCompleted = () =>
        applyActionToGoalList(TaskActions.toggleTask(goalId, id, 'isCompleted'));


    const handleEnterPress = (event: KeyboardEvent) => handleSubmitEnter(event, () => {
        if (!isLast) {
            findNextElementInListToFocusOn(tasksListOfIds, index);
        }
        handleToggleObjectiveEditing()
    });


    const isLast = tasksListOfIds.length === index

    if (isEditing) {
        return <div className={`Task ${isEditing ? 'editing' : ''}`}>
            <FloatingLabelInputWithButton onChange={handleInputChange} width='100%' divProps={{className: "TaskInput"}}
                                          onKeyDown={handleEnterPress} id={id}
                                          value={text} label="" onClick={handleToggleObjectiveEditing}/>
        </div>;
    }

    return <div className="Task">
        <div>
            <IconButton className={'IconButton'} src={isCompleted ? check : unchecked} alt={''}
                        isActive={isCompleted}
                        variant={'accept'}
                        onClick={handleToggleObjectiveCompleted}/>
            <span onDoubleClick={handleToggleObjectiveEditing}>{text}</span>
        </div>
        <div>
            <IconButton className={'IconButton'} src={edit} alt={'edit'}
                        variant={'caution'}
                        onClick={handleToggleObjectiveEditing}/>

            <IconButton className={'IconButton'}
                        src={trash}
                        alt={''}
                        variant={'cancel'}
                        onClick={handleToggleObjectiveCompleted}/>
        </div>
    </div>;
}

export default Task;
