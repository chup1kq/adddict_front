export const ValidationError = {
    EMPTY_FIELD: {
        code: "EMPTY_FIELD",
        message: "Поля должны быть заполненными",
    },
    PASSWORD_TOO_SHORT: {
        code: "PASSWORD_TOO_SHORT",
        message: "Пароль должен содержать минимум 8 символов",
    },
    PASSWORDS_DONT_MATCH: {
        code: "PASSWORDS_DONT_MATCH",
        message: "Пароли не совпадают",
    },
    INVALID_CREDENTIALS: {
        code: "INVALID_CREDENTIALS",
        message: "Неверный логин или пароль",
    },
    PASSWORD_SPECIAL_CHAR: {
        code: "PASSWORD_SPECIAL_CHAR",
        message: "Пароль должен содержать хотя бы один специальный символ (!@#$%^&*)",
    },
    PASSWORD_CASE: {
        code: "PASSWORD_CASE",
        message: "Пароль должен содержать как заглавные, так и строчные буквы",
    },
    USER_EXISTS: {
        code: "USER_EXISTS",
        message: "Пользователь с таким логином уже существует",
    }
}