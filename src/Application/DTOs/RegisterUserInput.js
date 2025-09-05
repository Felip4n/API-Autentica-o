class RegisterUserInput {
    constructor(name, email, password) {
        if (!name || !email || !password) {
            throw new Error("name, email, and password are required.");
        }

        // Verifica se todos são strings
        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            throw new Error("name, email, and password must be strings.");
        }

        this.name = name;
        this.email = email;
        this.password = password;
    }
}

module.exports = RegisterUserInput;
