require('dotenv').config();

const port = process.env.PORT;

const welcomeMailBody = 
`<h2>Welcome!</h2>
<p>Hello there!</p>
<p>
    Welcome to our services. <br />
    If you got some issues, please contact us to resolve your issues. <br />
    Thank you for joining our services! <br />
</p>
<p>
    Sincerely, <br />
    Admin
</p>`;

const resetPasswordMailBody = 
`<h2>Hello!</h2>
<p>
    We received a request to reset the password for your account. <br />
    If this is true, you can click the link below to reset your password.
</p>
<a href="http://localhost:${port}/reset-password">Reset Password</a>
<p> If you didn't make this request, please ignore this email. </p>
<p>
    Thank you, <br />
    Admin
</p>`;

const changePasswordSuccessMailBody = 
`<h2>Congratulation!</h2>
<p>
    Your account password has been successfully changed. <br />
    If you didn't change you password, please contact us immediately by replying this email.
<p>
    Thank you, <br />
    Admin
</p>`;

module.exports = {
    welcomeMailBody,
    resetPasswordMailBody,
    changePasswordSuccessMailBody,
};