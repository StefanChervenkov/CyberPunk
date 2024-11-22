export function validateForm(email, password, repeatPassword) {
    if (email == '' || password == '' || repeatPassword == '') {
        throw new Error("All fields are required");
    }

    
    if (repeatPassword && password !== repeatPassword) {
        throw new Error("Passwords don't match");
    }
}