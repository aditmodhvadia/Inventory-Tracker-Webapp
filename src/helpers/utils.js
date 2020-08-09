export const isEmailValid = (email) => {
    return email !== null && email.length > 6
}

export const isPasswordValid = (password) => {
    return password !== null && password.length > 6
}

export const arePasswordsMatching = (password, confirmPassword) => {
    return password === confirmPassword
}