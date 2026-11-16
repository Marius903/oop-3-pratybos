// Fish class
class Fish extends Animal {
    constructor(name, age, fins, scales, water) {
        super(name, age);

        this.fins = fins;
        this.scales = scales;
        this.water = water;
    }

    getInformation() {
        return {
            name: this.name,
            age: this.age,
            fins: this.fins,
            scales: this.scales,
            water: this.water
        };
    }
}