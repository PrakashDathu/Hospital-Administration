export const successRegistration = () => ({
    statusCode: 200,
    message: 'Please verify your email to login',
});

export const userNotFound = () => ({
    statusCode: 400,
    message: 'Authentication failed. User not found',
    errors: { username: 'User not found' },
});

export const userExists = () => ({
    statusCode: 400,
    message: 'User with email already exists',
    errors: { email: "Email already exists"}
});
export const wrongCredentials = () => ({
    statusCode: 400,
    message: 'Authentication failed. Incorrect Credentials',
    errors: {user: 'Invalid Credentials'},
});


export const fieldAlreadyExist = (field) => ({
    statusCode: 400,
    message: `the ${field} are already exist`,
    errors: {[field]: `the ${field} are already exist`},
});

export const loginSuccess = (user) => ({
    statusCode: 200,
    message: 'User logged success',
    user: user,
});

export const jwtCheckError  = () => ({
    statusCode: 400,
    message: 'Failed to authenticate jwt',
    errors: { jwt: 'Please Login' },
});
export const loginWithTokenSuccess = (user) => ({
    statusCode: 200,
    message: 'User good logged',
    user,
});

export const emailLinkVerificationNeeded = () => ({
    statusCode: 400,
    message: 'Sorry! you need to verify you email by clicking to the link that we sent to  you in your email acount',
    errors: { email: 'please verify your email' },
});

export const failedAuthToken = () => ({
    statusCode: 400,
    message: 'Failed to authenticate token',
    errors: { token: 'Invalid Token' },
});

export const invalidLinkEmailVerification = () => ({
    statusCode: 400,
    message: 'invalid verification link',
    errors: { link: 'invalid' },
});

export const userAlreadyVerified= () => ({
    statusCode: 400,
    message: 'User are already verified',
    errors: { user: 'Already Verified' },
});

export const successEmailVerification = () => ({
    statusCode: 200,
    message: 'Email verified Successfully, Please log in',
});

export const userRegistrationFailed = () => ({
   statusCode: 400,
   message: 'Registration failed, please try again!',
   errors: { user: 'Failed Registration'}
});

export const internalServerError = () => ({
    statusCode: 500,
    message: 'Server Error',
    errors: { server: 'Internal Server Error'}
});
