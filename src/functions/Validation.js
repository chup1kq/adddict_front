import {ValidationError} from "../enums/ValidationErrors"

export default class Validation {

    constructor() {
        this.errors = [];
    }

    validate(login, password) {
        this.validateLogin(login);
        this.validatePassword(password);
    }

    validateLogin(login) {
        if ((!login || !login.trim()) && !this.errors.includes(ValidationError.EMPTY_FIELD)) {
            this.errors.push(ValidationError.EMPTY_FIELD);
        }
    }

    validatePassword(password){
        if ((!password || !password.trim()) && !this.errors.includes(ValidationError.EMPTY_FIELD)) {
            this.errors.push(ValidationError.EMPTY_FIELD);
        }

        if (password.length < 8) {
            this.errors.push(ValidationError.PASSWORD_TOO_SHORT);
        }

        if (!/[!@#$%^&*]/.test(password)) {
            this.errors.push(ValidationError.PASSWORD_SPECIAL_CHAR);
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
            this.errors.push(ValidationError.PASSWORD_CASE);
        }
    }

    clearErrors() {
        this.errors = [];
    }
}