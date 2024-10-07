import {type GoalType, TaskType} from "@repo/types";
import React, {ChangeEvent, KeyboardEvent} from "react";
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
import {
    allDueDates,
    ColorSelection,
    type DUE_DATE,
    findNextElementInListToFocusOn,
    getDueDateFromDate
} from "../../../../utils/utils";
import Tasks from "../Task/Task";
import {handleSubmitEnter} from "@repo/shared";
import dayjs from "dayjs";
import copy from './assets/copy.svg'
import star from './assets/star.svg'
import starOutline from './assets/star_outline.svg'
import uncheckAll from './assets/remove_check.svg'
import checkAll from './assets/confirm_check.svg'
import edit from './assets/pencil.svg'
import trash from './assets/archive.ico'
import './Goal.css';

type GoalProps = GoalType & { id: string }

function Goal({id, completionDate, name, isEditing, isFavorite, tasks, tasksCompleted}: GoalProps) {
    const {applyActionToGoalList} = useGoalListContext();

    const tasksListOfIds = Object.keys(tasks);

    const handleAddTask = () => applyActionToGoalList(TaskActions.create(id));
    const handleDuplicateGoal = () => applyActionToGoalList(GoalActions.duplicate(id));
    const handleUpdateDueDate = (value: DUE_DATE) => applyActionToGoalList(GoalActions.updateDueDate(id, value))
    const handleUpdateGoalName = (value: ChangeEvent<HTMLInputElement>) => applyActionToGoalList(GoalActions.updateName(id, value.target.value))
    const handleDeleteGoal = () => applyActionToGoalList(GoalActions.remove(id));
    const handleToggleGoalEditing = () => applyActionToGoalList(GoalActions.toggleEditing(id, 'isEditing'));
    const handleToggleGoalFavorite = () => applyActionToGoalList(GoalActions.toggleEditing(id, 'isFavorite'));
    const handleToggleAllTasks = () => applyActionToGoalList(TaskActions.toggleAllTasks(id));

    const formattedDate = dayjs(completionDate).format('M/D/YY')

    const isEveryTaskComplete = tasksListOfIds.every((taskId) => {
        const taskBeingChecked = tasks[taskId] as TaskType;

        return taskBeingChecked.isCompleted
    })

    const selectedOption = getDueDateFromDate(completionDate);

    const handleGoalNameEnterPress  = (event: KeyboardEvent) => handleSubmitEnter(event, ()=> {
        handleToggleGoalEditing()
        findNextElementInListToFocusOn(tasksListOfIds)
    })

    return <div className='Goal'>
        <div className={'TopIndicator'} style={ColorSelection['Default'][selectedOption]}/>

        <Select<DUE_DATE>
            containerAttributes={{className: 'Select'}}
            selectedOptionAttributes={{
                className: 'SelectedOption',
                style: {color: ColorSelection['Default'][selectedOption].backgroundColor}
            }}
            options={allDueDates()} optionAttributes={
            {style: ((option) => ({...ColorSelection['Default'][option]}))}
        }
            selectedOption={selectedOption} onClick={handleUpdateDueDate}/>
        <CloseButton onClick={handleDeleteGoal}/>
        <IconButton className={'FavoriteButton'} src={isFavorite ? star : starOutline}
                    alt={'Star'} variant={'standard'} isActive={isFavorite} title={'Favorite Goal'}
                    style={{backgroundColor: isFavorite ? ColorSelection['Default'][selectedOption].backgroundColor : ''}}
                    onClick={handleToggleGoalFavorite}/>
        <div className='Header'>
            {
                isEditing
                    ?
                    <FloatingLabelInputWithButton label='' placeholder={'Goal Name'} value={name}
                                                  onClick={handleToggleGoalEditing}
                                                  onKeyDown={handleGoalNameEnterPress}
                                                  width={300} onChange={handleUpdateGoalName}
                    />
                    :
                    <h2 onDoubleClick={handleToggleGoalEditing}>
                        {name}
                    </h2>
            }
            <div>
                <p>Due: {formattedDate}</p>
                <p>Completed: <b>{Math.round((tasksCompleted / tasksListOfIds.length) * 100)}%</b></p>
            </div>

        </div>
        <div className='Subheader'>

            <IconButton className={'IconButton'}
                        src={isEveryTaskComplete ? checkAll : uncheckAll}
                        alt={'Reset Objectives'}
                        isActive={isEveryTaskComplete}
                        variant={'accept'} title={'Toggle goal tasks'}
                        onClick={handleToggleAllTasks}/>
            <IconButton className={'IconButton'} src={edit} alt={'Duplicate'}
                        variant={'accept'} title={'Edit goal'}
                        onClick={handleToggleGoalEditing}/>
            <IconButton className={'IconButton'} src={copy} alt={'Duplicate'}
                        variant={'accept'} title={'Duplicate goal'}
                        onClick={handleDuplicateGoal}/>

            <IconButton className={'IconButton'} src={trash} alt={'Archive'}
                        variant={'caution'} onClick={handleDuplicateGoal}/>
        </div>
        <div>
            {tasksListOfIds.map((taskId, index) =>
                <React.Fragment key={taskId}>
                    <Tasks id={taskId} tasksListOfIds={tasksListOfIds} index={index}
                           goalId={id} isLast={index === tasksListOfIds.length}
                           {...(tasks[taskId]) as TaskType} />
                </React.Fragment>
            )}
        </div>
        <div className={'GoalIndicator'} style={ColorSelection['Default'][selectedOption]}/>
        <Button className="AddTask" onClick={handleAddTask}>Add Task</Button>
    </div>;
}

export default Goal;