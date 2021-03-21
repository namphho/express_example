module.exports = class User {
    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    print() {
        return `${this.firstName} + ${this.lastName} + ${this.email}`;
    }
}