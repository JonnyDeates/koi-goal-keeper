export type PasswordUpdateStateType = {
    password: string,
    newPassword: string,
    confirmNewPassword: string,
    isPasswordEditing: boolean
}

const PasswordUpdateActions = {
    toggleEditing: (prevState: PasswordUpdateStateType) => (
        {...prevState, isPasswordEditing:!prevState.isPasswordEditing}),
    reset: (prevState: PasswordUpdateStateType) => ({newPassword: '', isPasswordEditing: false, confirmNewPassword: '', password: ''}),
    update: (key: keyof Omit<PasswordUpdateStateType, 'isPasswordEditing'>, newValue: string)=> (prevState: PasswordUpdateStateType) => ({...prevState,[key]: newValue })

}
export default PasswordUpdateActions