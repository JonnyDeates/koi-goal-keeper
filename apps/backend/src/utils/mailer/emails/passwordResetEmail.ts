const passwordResetEmail = (email: string, token: string) => ({
    to: email,
    subject: "Koi Goal Keeper Password Reset",
    text: `To reset your password enter the token provided on https://koicoin.app/forgot-password/token?email=${email} . \n` +
        "Thank you for using the Koi Foundation Services. We strive to do our best with helping and providing \n" +
        "the tools you need to be successful. Thank You for using our apps. \n" +
        `The token is: ${token}`
})
export default passwordResetEmail;