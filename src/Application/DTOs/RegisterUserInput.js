class registerUserInput {
    constructor(name, email, password) {
        if (!name || !email || !password) {
            throw new Error("name, email, and password are required.");
        }
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
module.exports = registerUserInput;
//# sourceMappingURL=RegisterUserInput.js.map