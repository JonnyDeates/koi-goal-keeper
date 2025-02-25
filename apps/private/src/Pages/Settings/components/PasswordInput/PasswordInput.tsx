import React, {ChangeEvent, useState} from "react";
import {useError} from "@repo/shared";
import {validatePassword} from "@repo/utils";
import UserClient from "../../clients/UserClient";
import {Button, Input, SpacedLabel} from "koi-pool";
import PasswordUpdateActions, {PasswordUpdateStateType} from "./PasswordUpdateActions";


const PasswordInput = () => {
    const [{password, newPassword, isPasswordEditing, confirmNewPassword}, applyActionToPasswordState] = useState<PasswordUpdateStateType>({newPassword: '', isPasswordEditing: false, confirmNewPassword: '', password: ''})
    const {error, ErrorActions, handleCatchError} = useError<'confirm_password' | 'password' | 'new_password'>()

    const togglePasswordEditing = () => applyActionToPasswordState(PasswordUpdateActions.toggleEditing)

    const handleSubmit = () => {
        const hasCurrentPasswordError = validatePassword(password);
        const hasNewPasswordError = validatePassword(newPassword);
        const hasConfirmPasswordError = validatePassword(confirmNewPassword);

        let isValid = true;
        if (hasCurrentPasswordError) {
            ErrorActions.add('password', hasCurrentPasswordError)
            isValid = false;
        }
        if (hasNewPasswordError) {
            ErrorActions.add('new_password', hasNewPasswordError)
            isValid = false;
        }
        if (hasConfirmPasswordError) {
            ErrorActions.add('confirm_password', hasConfirmPasswordError)
            isValid = false
        }
        if (newPassword !== confirmNewPassword) {
            ErrorActions.add('new_password', ' ')
            ErrorActions.add('confirm_password', 'New password and confirm new password does NOT match')
            isValid = false
        }
        if (isValid) {
            UserClient.updatePassword(password, newPassword).then(() => {
                applyActionToPasswordState(PasswordUpdateActions.reset)
                ErrorActions.reset()
            }).catch(handleCatchError)
        }
    }
    const handleCancel = () => {
        applyActionToPasswordState(PasswordUpdateActions.reset)
        ErrorActions.reset()
    }

    const handleUpdatePassword = (e: ChangeEvent<HTMLInputElement>) => applyActionToPasswordState(PasswordUpdateActions.update('password', e.target.value))
    const handleUpdateNewPassword = (e: ChangeEvent<HTMLInputElement>) => applyActionToPasswordState(PasswordUpdateActions.update('newPassword', e.target.value))
    const handleUpdateConfirmNewPassword = (e: ChangeEvent<HTMLInputElement>) => applyActionToPasswordState(PasswordUpdateActions.update('confirmNewPassword', e.target.value))

    if (!isPasswordEditing) {
        return <SpacedLabel label={'Password'} onClick={togglePasswordEditing}>
            ******
        </SpacedLabel>
    }
    return <div>
        <SpacedLabel label={'Current Password'}>
            <Input type={"password"} placeholder={"******"} style={{fontFamily: "Comfortaa"}}
                   error={error.password} onChange={handleUpdatePassword}
                   value={password}/>
        </SpacedLabel>
        <SpacedLabel label={'New Password'}>
            <Input type={"password"} placeholder={"******"}
                   style={{fontFamily: "Comfortaa"}} value={newPassword}
                   error={error.new_password} onChange={handleUpdateNewPassword}
            />
        </SpacedLabel>
        <SpacedLabel label={"Confirm New Password"}>
            <Input type={"password"} placeholder={"******"} style={{fontFamily: "Comfortaa"}}
                   value={confirmNewPassword} error={error.confirm_password} onChange={handleUpdateConfirmNewPassword}
            />
        </SpacedLabel>
        <SpacedLabel label={''}>
            <div>
                <Button variant={'cancel'} onClick={handleCancel}>Cancel</Button>
                <Button variant={'accept'} onClick={handleSubmit}>Save</Button>
            </div>

        </SpacedLabel>

    </div>

}
export default PasswordInput