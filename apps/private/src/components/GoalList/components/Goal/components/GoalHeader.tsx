import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FloatingLabelInputWithButton} from "koi-pool";
import {GoalType} from "@repo/types";
import dayjs from "dayjs";
import GoalActions from "../../../actions/GoalActions";
import {useGoalListContext} from "../../../../../contexts/GoalListProvider/GoalListProvider";
import {handleSubmitEnter} from "@repo/shared";
import {findNextElementInListToFocusOn} from "../../../../../utils/utils";

type GoalHeaderProps = GoalType & { id: string, handleToggleGoalEditing: () => void, tasksListOfIds: string[] }

const GoalHeader = ({
                      completionDate,
                      isEditing,
                      tasksCompleted,
                      name,
                      id,
                      handleToggleGoalEditing,
                      tasksListOfIds
                    }: GoalHeaderProps) => {
  const {applyActionToGoalList} = useGoalListContext();
  const [newCompletionDate, setNewCompletionDate] = useState(completionDate);

  const handleGoalNameEnterPress = (event: KeyboardEvent) => handleSubmitEnter(event, () => {
    handleToggleGoalEditing()
    findNextElementInListToFocusOn(tasksListOfIds)
  });

  const handleUpdateGoalName = (value: ChangeEvent<HTMLInputElement>) => applyActionToGoalList(GoalActions.updateName(id, value.target.value))

  const handleSetNewCompletionDate = (event: ChangeEvent<HTMLInputElement>) => {
    const userDate = event.target.value;
    const parsedDate = dayjs(userDate);
    if (parsedDate.isValid()) {
      setNewCompletionDate(parsedDate.toDate());
    } else {
      console.error('Invalid date:', userDate);
    }
  };
  const handleUpdateGoalDate = () => {
      applyActionToGoalList(GoalActions.updateDueDate(id, newCompletionDate))
  };

  const formattedDate = dayjs(newCompletionDate).format('YYYY-MM-DD')

  return (
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

        <p>Due:
          <input type='date' value={formattedDate} onChange={handleSetNewCompletionDate}
                 onKeyDown={(event) => handleSubmitEnter(event, handleUpdateGoalDate)}
                 onBlur={handleUpdateGoalDate}/>
        </p>
        <p>Completed: <b>{Math.round((tasksCompleted / tasksListOfIds.length) * 100)}%</b></p>
      </div>

    </div>
  );
};

export default GoalHeader;