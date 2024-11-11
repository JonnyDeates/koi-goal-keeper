import {type GoalListType, TaskListType, type TaskType} from "@repo/types";

const calculateTaskCount = (taskList: Record<string, TaskType>) => {
    const taskListOfIds = Object.keys(taskList);

    return taskListOfIds.reduce((count, objectiveId) => {
        if (taskList[objectiveId]?.isCompleted)
            return count + 1;
        return count;
    }, 0);
};

const TaskActions = {
    create: (goalId: number, task: TaskType) => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId];
        if (goalBeingModified) {
            goalBeingModified.tasks[task.id] = task;

            return {...prevState};
        }
        return prevState;

    },
    remove: (goalId: number, objectiveId: number) => (prevState: GoalListType): GoalListType => {

        const goalBeingModified = prevState[goalId];

        if (goalBeingModified) {
            const objectBeingModified = goalBeingModified.tasks[objectiveId];
            if (objectBeingModified && objectBeingModified.isCompleted) {
                goalBeingModified.tasksCompleted -= 1
            }
            delete goalBeingModified.tasks[objectiveId];

            return {...prevState};
        }
        return prevState
    },
    updateTaskText: (goalId: number, objectiveId: number, text: string) => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId];

        if (goalBeingModified) {
            const objectiveToModify = goalBeingModified.tasks[objectiveId];

            if (objectiveToModify) {
                objectiveToModify.name = text;
            }
            return {...prevState};

        }

        return prevState;
    },
    toggleTask: (goalId: number, objectiveId: number, key: 'isEditing' | 'isCompleted') => (prevState: GoalListType): GoalListType => {
        const goalBeingModified = prevState[goalId];

        if (goalBeingModified) {
            const objectiveToModify = goalBeingModified.tasks[objectiveId];

            if (objectiveToModify) {
                objectiveToModify[key] = !objectiveToModify[key];
            }

            if (key === 'isCompleted') {
                goalBeingModified.tasksCompleted = calculateTaskCount(goalBeingModified.tasks);
            }
            return {...prevState};
        }
        return prevState;

    },
    toggleAllTasks: (goalId: number, taskList: TaskListType) => (prevState: GoalListType) => {
        const goalBeingModified = prevState[goalId];

        if (goalBeingModified) {
            goalBeingModified.tasks = taskList;

            goalBeingModified.tasksCompleted = Object.keys(taskList)
                .reduce((acc, taskId) => {
                    if (taskList[taskId] && taskList[taskId].isCompleted)
                        return acc + 1
                    return acc
                }, 0);

            return {...prevState};
        }
        return prevState;

    }
};

export default TaskActions;