import React, {ChangeEvent, KeyboardEvent} from 'react';
import {FloatingLabelInputWithButton} from "koi-pool";
import {GoalType} from "@repo/types";
import dayjs from "dayjs";
import GoalActions from "../../../actions/GoalActions";
import {useGoalListContext} from "../../../../../contexts/GoalListProvider/GoalListProvider";
import {handleSubmitEnter} from "@repo/shared";
import {findNextElementInListToFocusOn} from "../../../../../utils/utils";
import GoalClient from "../clients/GoalClient";

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
  const {applyActionToGoalList, searchResults: {goalsFoundFromSearch}} = useGoalListContext();


  const handleSaveEntry = () => {
    if (isEditing)
      GoalClient.update(id, {name}).then((response) => {

        if (response.status === 200) {
          findNextElementInListToFocusOn(tasksListOfIds)
        }
      })
    handleToggleGoalEditing()

  }

  const handleGoalNameEnterPress = (event: KeyboardEvent) => handleSubmitEnter(event, handleSaveEntry);

  const handleUpdateGoalName = (value: ChangeEvent<HTMLInputElement>) => applyActionToGoalList(GoalActions.updateName(id, value.target.value))

  const handleSetNewCompletionDate = (event: ChangeEvent<HTMLInputElement>) => {
    const userDate = event.target.value;
    const parsedDate = dayjs(userDate);
    if (parsedDate.isValid()) {
      applyActionToGoalList(GoalActions.updateDueDate(id, parsedDate.toDate()))
    } else {
      console.error('Invalid date:', userDate);
    }
  };
  const handleUpdateGoalDate = () => {
    GoalClient.update(id, {completionDate}).then((response) => {

    })
  };

  const formattedDate = dayjs(completionDate).format('YYYY-MM-DD')

  return (
    <div className='Header'>
      {
        isEditing
          ?
          <FloatingLabelInputWithButton label='' placeholder={'Goal Name'} value={name}
                                        onClick={handleSaveEntry}
                                        onKeyDown={handleGoalNameEnterPress}
                                        width={300} onChange={handleUpdateGoalName}
          />
          :
          !!name
            ?
            <h2 onDoubleClick={handleToggleGoalEditing} className={goalsFoundFromSearch[id] ? 'Highlighted' : ''}>
              {name}
            </h2> :
            <>  </>
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