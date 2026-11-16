// Parent class
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.isAdopted = false;
    }

    getInformation() {
        return {
            name: this.name,
            age: this.age
        };
    }
}

// Cat class
class Cat extends Animal {
    constructor(name, age, legs, fur, tail, whiskers) {
        super(name, age);

        this.legs = legs;
        this.fur = fur;
        this.tail = tail;
        this.whiskers = whiskers;
    }

    getInformation() {
        return {
            name: this.name,
            age: this.age,
            legs: this.legs,
            fur: this.fur,
            tail: this.tail,
            whiskers: this.whiskers
        };
    }
}