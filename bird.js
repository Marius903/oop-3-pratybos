// Bird class
class Bird extends Animal {
    constructor(name, age, legs, wings, feathers, beak) {
        super(name, age);

        this.legs = legs;
        this.wings = wings;
        this.feathers = feathers;
        this.beak = beak;
    }

    getInformation() {
        return {
            name: this.name,
            age: this.age,
            legs: this.legs,
            wings: this.wings,
            feathers: this.feathers,
            beak: this.beak
        };
    }
}