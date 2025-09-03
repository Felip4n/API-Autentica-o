class Name {
    constructor(value) {
        if (typeof value !== "string" || !value.trim()) {
            throw new Error("Invalid name.");
        }
        this.value = value.trim();
    }
}

module.exports = Name;