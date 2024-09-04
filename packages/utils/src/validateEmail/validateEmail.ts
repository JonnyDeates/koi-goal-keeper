

export const validateEmail = (email: string): string => {
    const REGEX_MOST_EMAILS = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const formattedEmail = email.trim()
    if (formattedEmail.length === 0) {
        return 'No email entered.';
    }
    if (!REGEX_MOST_EMAILS.test(formattedEmail)) {
        return "Email not properly formatted";
    }

    return ''
}
