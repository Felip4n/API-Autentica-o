class UserAlreadyExistsException extends Error {
    constructor(message) {
        super(message);
        this.name = "UserAlreadyExistsException";
        this.statusCode = 400; //opcional, bom para http
    }
}
module.exports = UserAlreadyExistsException;