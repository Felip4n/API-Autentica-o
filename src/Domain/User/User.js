const Email = require("./ValueObjects/Email");
const Password = require("./ValueObjects/Password");//assumimos que password ja fez o hash
const Name = require("./ValueObjects/Name");
const { v4: uuidv4} = require("uuid");

class User {
    constructor(name, email, password, id = uuidv4()) {
        if (!id || !name || !email || !password) {
            throw new Error("User properties cannot be empty.");
        }

        this.id = id; //uuid
        this.name = new Name(name);
        this.email = new Email(email);
        //Password é um value object que faz o hash
        this.password = new Password(password); //assumimos que password ja fez o hash
    } 

    async comparePassword(plainPassword) {
        return await this.password.compare(plainPassword);
    }

    async validatePassword(plainPassword) {
        this.password = new Password(newPassword);
    }

    toObject() {
        return {
            id: this.id,
            name: this.name.value,
            email: this.email.value,
            password: this.password.hashedPassword
        };
    }
}

module.exports = User;