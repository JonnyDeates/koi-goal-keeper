import {type GoalType, TaskType} from "@repo/types";
import React, {ChangeEvent, useState} from "react";
import {
    Button,
    CloseButton,
    FloatingLabelInputWithButton,
    IconButton,
    Select,
} from "koi-pool";
import TaskActions from "../../actions/TaskActions";
import {useGoalListContext} from "../../../../contexts/GoalListProvider/GoalListProvider";
import GoalActions from "../../actions/GoalActions";
import {allDueDates, type DUE_DATE, getDueDateFromDate} from "../../../../utils/utils";
import Tasks from "../Task";
import {handleSubmitEnter} from "@repo/shared";
import dayjs from "dayjs";
import copy from './assets/copy.svg'
import edit from './assets/pencil.svg'
import trash from './assets/archive.ico'

type GoalProps = GoalType & { id: string }

function Goal({id, completionDate, name, isEditing, tasks, tasksCompleted}: GoalProps) {
    const {applyActionToGoalList} = useGoalListContext();

    const tasksListOfIds = Object.keys(tasks);

    const handleAddObjective = () => {
        applyActionToGoalList(TaskActions.create(id));
    };

    const handleDuplicateGoal = () => {
        applyActionToGoalList(GoalActions.duplicate(id));
    };

    const handleUpdateDueDate = (value: DUE_DATE) => {
        applyActionToGoalList(GoalActions.updateDueDate(id, value));
    };

    const handleUpdateGoalName = (value: ChangeEvent<HTMLInputElement>) => {
        applyActionToGoalList(GoalActions.updateName(id, value.target.value));
    };
    const handleDeleteGoal = () => {
        applyActionToGoalList(GoalActions.remove(id));
    };

    const handleToggleGoalEditing = () => {
        applyActionToGoalList(GoalActions.toggleEditing(id));
    };

    const formattedDate = dayjs(completionDate).format('M/D/YY')

    return <div className='Goal'>
        <Select<DUE_DATE>
            containerAttributes={{className: 'Select'}}
            selectedOptionAttributes={{className: 'SelectedOption'}}
            options={allDueDates()}
            selectedOption={getDueDateFromDate(completionDate)} onClick={handleUpdateDueDate}/>
        <CloseButton onClick={handleDeleteGoal}/>
        <div className='Header'>
            {
                isEditing
                    ?
                    <FloatingLabelInputWithButton label='' placeholder={'Goal Name'} value={name}
                                                  onClick={handleToggleGoalEditing}
                                                  onKeyDown={(event) => handleSubmitEnter(event, handleToggleGoalEditing)}
                                                  width={300} onChange={handleUpdateGoalName}
                    />
                    : <h2 onDoubleClick={handleToggleGoalEditing}>{name}</h2>
            }
            <div>
                <p>Due: {formattedDate}</p>
                <p>Tasks Completed: {tasksCompleted}</p>
            </div>

        </div>
        <div className='Subheader'>
            <IconButton className={'IconButton'} src={copy} alt={'Duplicate'} variant={'accept'} onClick={handleDuplicateGoal}/>
            <IconButton className={'IconButton'}  src={edit} alt={'Edit'} variant={'caution'} onClick={handleDuplicateGoal}/>
            <IconButton className={'IconButton'}  src={trash} alt={'Archive'} variant={'caution'} onClick={handleDuplicateGoal}/>
        </div>
        <div>


            {tasksListOfIds.map((taskId) =>
                <React.Fragment key={taskId}>
                    <Tasks id={taskId}
                           goalId={id}
                           {...(tasks[taskId]) as TaskType} />
                </React.Fragment>
            )}
        </div>
        <Button className="AddObjective" onClick={handleAddObjective}>Add Objective</Button>
    </div>;
}

export default Goal;