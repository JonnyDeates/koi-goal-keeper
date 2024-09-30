import {type GoalListType, type TaskType} from "@repo/types";
import {createId} from "@paralleldrive/cuid2";
import {buildTask} from "../../../utils/builders/buildTask";

const calculateTaskCount = (taskList: Record<string, TaskType>) => {
  const taskListOfIds = Object.keys(taskList);

  return taskListOfIds.reduce((count, objectiveId) => {
    if (taskList[objectiveId]?.isCompleted)
      return count + 1;
    return count;
  }, 0);
};

const TaskActions = {
  create: (goalId: string) => (prevState: GoalListType): GoalListType => {
    const goalBeingModified = prevState[goalId];
    if(goalBeingModified){
      goalBeingModified.tasks[createId()] = buildTask();
    }

    return {...prevState};
  },
  updateTaskText: (goalId: string, objectiveId: string, text: string) => (prevState: GoalListType): GoalListType => {
    const goalBeingModified = prevState[goalId];

    if (goalBeingModified) {
      const objectiveToModify = goalBeingModified.tasks[objectiveId];

      if (objectiveToModify) {
        objectiveToModify.text = text;
      }
    }

    return {...prevState};
  },
  toggleTask: (goalId: string, objectiveId: string, key: 'isEditing' | 'isCompleted') => (prevState: GoalListType): GoalListType => {
    const goalBeingModified = prevState[goalId];

    if (goalBeingModified) {
      const objectiveToModify = goalBeingModified.tasks[objectiveId];

      if (objectiveToModify) {
        objectiveToModify[key] = !objectiveToModify[key];
      }

      if (key === 'isCompleted') {
        goalBeingModified.tasksCompleted = calculateTaskCount(goalBeingModified.tasks);
      }
    }
    return {...prevState};
  },
};

export default TaskActions;