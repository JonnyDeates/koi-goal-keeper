
export const validateSignUpPassword = (password: string): string => {
    const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])+/;

    if (password.length === 0) {
        return 'No password entered.';
    }

    if (password.length < 8) {
        return 'Password must be longer than 8 characters.';
    }
    if (password.length > 72) {
         return 'Password must be less than 72 characters.';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
        return 'Password must not start or end with empty spaces.';
    }
    if (!REGEX_UPPER_LOWER_NUMBER.test(password)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'

    }
    return ''
}
export const validatePassword = (password: string): string => {
    const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])+/;

    if (password.length < 8 || password.length > 72
        || password.startsWith(' ') || password.endsWith(' ')
        || !REGEX_UPPER_LOWER_NUMBER.test(password)) {
        return 'Password is invalid.';
    }
    return ''
}