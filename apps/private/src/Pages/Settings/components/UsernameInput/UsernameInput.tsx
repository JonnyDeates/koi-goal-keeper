import {useSettings} from "../../../../contexts/SettingsProvider/SettingsProvider";
import React, {ChangeEvent, useEffect, useState} from "react";
import {handleSubmitEnter, useError} from "@repo/shared";
import {validateName} from "@repo/utils";
import UserClient from "../../clients/UserClient";
import {Button, Input, SpacedLabel} from "koi-pool";
import SettingsActions from "../../actions/SettingsActions";

const UsernameInput = () => {
    const {user: {name}, applyActionToUser} = useSettings();

    const [isNameEditing, setIsNameEditing] = useState<boolean>(false);

    const {error, ErrorActions, handleCatchError} = useError<'username'>()

    const [updatedName, setUpdatedName] = useState(name);

    useEffect(() => {
        setUpdatedName(name)
    }, [name])

    const toggleNameEditing = () => {
        setIsNameEditing(prevState => !prevState);
    }

    const handleUpdatedNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedName(e.target.value)
    }
    const handleReset = () => {
        setUpdatedName(name);
        ErrorActions.reset();
        toggleNameEditing();
    }
    const handleSubmit = () => {
        const hasNameError = validateName(updatedName)
        if (hasNameError) {
            ErrorActions.add('username', hasNameError)
        } else {
            UserClient.updateName(updatedName).then((data) => {
                applyActionToUser(SettingsActions.updateName(updatedName))
                ErrorActions.reset();
                toggleNameEditing()
            }).catch(handleCatchError)
        }
    }
    if (!isNameEditing) {
        return <SpacedLabel label={'Username'} onClick={toggleNameEditing}>
            {name}
        </SpacedLabel>
    }
    return <SpacedLabel label={'Username'}>
        <div>
            <Input value={updatedName}
                   onChange={handleUpdatedNameChange}
                   onKeyDown={(e) => handleSubmitEnter(e, handleSubmit)}
                   error={error.username}
                   style={{fontFamily: "Comfortaa"}}/>
            <Button variant={'cancel'} onClick={handleReset}>Cancel</Button>
            <Button variant={'accept'} onClick={handleSubmit}>Save</Button>
        </div>
    </SpacedLabel>
}
export default UsernameInput