import React, {useState} from 'react';
import {CloseButton, GenericAcceptanceModal} from "koi-pool";
import GoalActions from "../../../actions/GoalActions.js";
import {useGoalListContext} from "../../../../../contexts/GoalListProvider/GoalListProvider.js";
import {TaskType} from "@repo/types";
import GoalClient from "../clients/GoalClient";

type GoalDeleteButtonProps = { id: number, name: string, taskListOfIds: string[] };

const GoalDeleteButton = ({id, name, taskListOfIds}: GoalDeleteButtonProps) => {
    const {applyActionToGoalList} = useGoalListContext();
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState<boolean>(false)

    const handleClose = () => {
        setShowConfirmDeleteModal(false);
    }

    const handleDeleteGoal = () => {
        GoalClient.remove(id).then(()=>{
            applyActionToGoalList(GoalActions.remove(id));
        })
    }

    const showDeleteModal = () => {
        if (taskListOfIds.length <= 1) {
            handleDeleteGoal();
        } else {
            setShowConfirmDeleteModal(true)
        }
    }

    return (
        <>
            <CloseButton onClick={showDeleteModal}/>

            <GenericAcceptanceModal handleClose={handleClose} handleSubmit={handleDeleteGoal}
                                    isOpen={showConfirmDeleteModal}
                                    modalAttributes={{
                                        style: {
                                            height: 'fit-content',
                                            fontSize: '1rem',
                                            minHeight: "200px"
                                        }
                                    }}
                                    isNegative
                                    cancelButtonText={'Keep it'}
                                    submitButtonText={'Delete it'}
                                    actionGroupAttributes={{style: {marginTop: '3rem', border: 'unset'}}}
            >
                <h2>
                    Are you sure you want to delete the goal
                    {Boolean(name) ? <i> ({name})</i> : ''}?
                </h2>
            </GenericAcceptanceModal>
        </>

    );
};

export default GoalDeleteButton;