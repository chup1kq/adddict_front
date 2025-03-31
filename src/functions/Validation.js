export default class Validation {

    constructor() {
        this.errors = [];
    }

     ValidationError = {
        EMPTY_FIELD: {
            code: "EMPTY_FIELD",
            message: "Поле не может быть пустым",
        },
        INVALID_EMAIL: {
            code: "INVALID_EMAIL",
            message: "Неверный формат email",
        },
        PASSWORD_TOO_SHORT: {
            code: "PASSWORD_TOO_SHORT",
            message: "Пароль должен содержать минимум 6 символов",
        },
        NOT_A_NUMBER: {
            code: "NOT_A_NUMBER",
            message: "Значение должно быть числом",
        },
    }

    validate(login, password) {
        this.validateLogin(login);
        this.validatePassword(password);
    }

    validateLogin(login) {
        this.errors.push(this.ValidationError.EMPTY_FIELD);
    }

    validatePassword(password){
        this.errors.push(this.ValidationError.PASSWORD_TOO_SHORT);
    }

    clearErrors() {
        this.errors = [];
    }
}