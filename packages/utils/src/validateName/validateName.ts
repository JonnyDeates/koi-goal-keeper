export const validateName = (name: string): string => {
    const REGEX_MOST_NAMES = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9 ,.'-]+$/u
    const formattedEmail = name.trim()
    if (formattedEmail.length === 0) {
        return 'No name entered.';
    }
    if (!REGEX_MOST_NAMES.test(formattedEmail)) {
        return "Name has special characters";
    }

    return ''
}
