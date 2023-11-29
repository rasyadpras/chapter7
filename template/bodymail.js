const welcomeMailBody = () => {
    `<h2>Welcome!</h2>
    <p>
        Hello there!

        Welcome to our services.
        If you got some issues, please contact us to resolve your issues.
        Thank you for joining our services!

        Sincerely,
        Admin
    </p>`
};

const resetPasswordMailBody = () => {
    `<h2>Hello!</h2>
    <p>
        We received a request to reset the password for your account.
        If this is true, you can click the link below to reset your password.

        <a>Reset Password</a>

        If you didn't make this request, please ignore this email.

        Thank you,
        Admin
    </p>`
};

const changePasswordSuccessMailBody = () => {
    `<h2>Congratulation!</h2>
    <p>
        Your account password has been successfully changed.
        If you didn't change you password, please contact us immediately by replying this email.

        Thank you,
        Admin
    </p>`
};

module.exports = {
    welcomeMailBody,
    resetPasswordMailBody,
    changePasswordSuccessMailBody,
};