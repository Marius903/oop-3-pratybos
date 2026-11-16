"use strict";

// =====================================
// 1. PARENT CLASS
// =====================================

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

// =====================================
// 2. CAT CLASS
// =====================================

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

// =====================================
// 3. FISH CLASS
// =====================================

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

// =====================================
// 4. BIRD CLASS
// =====================================

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

// =====================================
// 5. HTML ELEMENTS
// =====================================

const form = document.getElementById("animal-form");
const formFields = document.getElementById("form-fields");
const formTitle = document.getElementById("form-title");
const listTitle = document.getElementById("list-title");
const animalsList = document.getElementById("animals-list");
const message = document.getElementById("message");

const buttons = document.querySelectorAll(".category-btn");

// =====================================
// 6. MAIN VARIABLES
// =====================================

let selectedCategory = "cats";
let animals = [];

// =====================================
// 7. LOAD DATA FROM LOCALSTORAGE
// =====================================

function loadAnimals() {
    try {
        const savedAnimals = localStorage.getItem("animals");

        if (savedAnimals !== null) {
            animals = JSON.parse(savedAnimals);

            if (!Array.isArray(animals)) {
                animals = [];
            }
        }
    } catch (error) {
        console.error("Klaida nuskaitant JSON:", error);
        animals = [];
    }
}

// =====================================
// 8. SAVE DATA TO LOCALSTORAGE
// =====================================

function saveAnimals() {
    localStorage.setItem("animals", JSON.stringify(animals));
}

// =====================================
// 9. SHOW TABLE IN CONSOLE
// =====================================

function showConsoleTable() {
    console.log("UŽREGISTRUOTI GYVŪNAI:");

    const tableData = animals.map(animal => ({
        ID: animal.id,
        Category: animal.category,
        Name: animal.information.name,
        Age: animal.information.age,
        ...animal.information,
        Status: animal.isAdopted ? "Atiduotas" : "Laukia naujų namų"
    }));

    console.table(tableData);
}

// =====================================
// 10. CATEGORY INFORMATION
// =====================================

const categories = {
    cats: {
        title: "katinai",
        formTitle: "Katino registracija",
        fields: [
            ["name", "Name", "text"],
            ["age", "Age", "number"],
            ["legs", "Legs", "number"],
            ["fur", "Fur", "text"],
            ["tail", "Tail", "text"],
            ["whiskers", "Whiskers", "text"]
        ]
    },

    fish: {
        title: "žuvys",
        formTitle: "Žuvies registracija",
        fields: [
            ["name", "Name", "text"],
            ["age", "Age", "number"],
            ["fins", "Fins", "number"],
            ["scales", "Scales", "text"],
            ["water", "Water", "select"]
        ]
    },

    birds: {
        title: "paukščiai",
        formTitle: "Paukščio registracija",
        fields: [
            ["name", "Name", "text"],
            ["age", "Age", "number"],
            ["legs", "Legs", "number"],
            ["wings", "Wings", "number"],
            ["feathers", "Feathers", "text"],
            ["beak", "Beak", "text"]
        ]
    }
};

// =====================================
// 11. CREATE FORM
// =====================================

function createForm() {
    formFields.innerHTML = "";

    const category = categories[selectedCategory];

    formTitle.textContent = category.formTitle;
    listTitle.textContent = "Užregistruoti " + category.title;

    category.fields.forEach(field => {
        const label = document.createElement("label");
        label.textContent = field[1] + ":";

        let input;

        if (field[2] === "select") {
            input = document.createElement("select");

            ["Gėlas", "Sūrus"].forEach(value => {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = value;
                input.appendChild(option);
            });

        } else {
            input = document.createElement("input");
            input.type = field[2];

            if (field[2] === "number") {
                input.min = "0";
                input.step = "1";
            }

            if (field[0] === "age") {
                input.max = "100";
            }
        }

        input.id = field[0];
        input.name = field[0];
        input.required = true;

        const group = document.createElement("div");
        group.className = "field-group";

        group.appendChild(label);
        group.appendChild(input);

        formFields.appendChild(group);
    });
}

// =====================================
// 12. CHANGE CATEGORY
// =====================================

buttons.forEach(button => {
    button.addEventListener("click", function () {
        selectedCategory = this.dataset.category;

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        form.reset();
        message.textContent = "";

        createForm();
        displayAnimals();
    });
});

// =====================================
// 13. CREATE ANIMAL
// =====================================

function createAnimal(name, age) {

    if (selectedCategory === "cats") {
        return new Cat(
            name,
            age,
            Number(document.getElementById("legs").value),
            document.getElementById("fur").value,
            document.getElementById("tail").value,
            document.getElementById("whiskers").value
        );
    }

    if (selectedCategory === "fish") {
        return new Fish(
            name,
            age,
            Number(document.getElementById("fins").value),
            document.getElementById("scales").value,
            document.getElementById("water").value
        );
    }

    if (selectedCategory === "birds") {
        return new Bird(
            name,
            age,
            Number(document.getElementById("legs").value),
            Number(document.getElementById("wings").value),
            document.getElementById("feathers").value,
            document.getElementById("beak").value
        );
    }
}

// =====================================
// 14. REGISTER ANIMAL
// =====================================

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = Number(document.getElementById("age").value);

    if (
        name === "" ||
        !Number.isInteger(age) ||
        age < 0 ||
        age > 100
    ) {
        message.textContent = "Patikrinkite vardą ir amžių!";
        message.className = "error";
        return;
    }

    const numberInputs = form.querySelectorAll(
        'input[type="number"]'
    );

    for (const input of numberInputs) {
        const value = Number(input.value);

        if (!Number.isInteger(value) || value < 0) {
            message.textContent = "Įveskite teisingus skaičius!";
            message.className = "error";
            return;
        }
    }

    const animal = createAnimal(name, age);

    const newAnimal = {
        id: Date.now(),
        category: selectedCategory,
        information: animal.getInformation(),
        isAdopted: false
    };

    // Add animal to array
    animals.push(newAnimal);

    // Save to LocalStorage
    saveAnimals();

    // Display animals on website
    displayAnimals();

    // Display table in F12 Console
    showConsoleTable();

    form.reset();

    message.textContent = "Gyvūnas sėkmingai užregistruotas!";
    message.className = "success";
});

// =====================================
// 15. DISPLAY ANIMALS
// =====================================

function displayAnimals() {
    animalsList.innerHTML = "";

    const foundAnimals = animals.filter(
        animal => animal.category === selectedCategory
    );

    if (foundAnimals.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "Kol kas gyvūnų nėra.";

        animalsList.appendChild(emptyMessage);
        return;
    }

    foundAnimals.forEach(animal => {
        const card = document.createElement("div");
        card.className = "animal-card";

        const heading = document.createElement("h3");
        heading.textContent = animal.information.name;

        card.appendChild(heading);

        for (const key in animal.information) {
            const paragraph = document.createElement("p");

            const label = key.charAt(0).toUpperCase() + key.slice(1);

            paragraph.textContent =
                label + ": " + animal.information[key];

            card.appendChild(paragraph);
        }

        // Adoption status
        const status = document.createElement("span");
        status.className = "status";

        if (animal.isAdopted) {
            status.textContent = "Atiduotas";
            status.classList.add("given");
        } else {
            status.textContent = "Laukia naujų namų";
        }

        card.appendChild(status);

        // Action buttons
        const actions = document.createElement("div");
        actions.className = "card-actions";

        const adoptButton = document.createElement("button");

        if (animal.isAdopted) {
            adoptButton.textContent = "Grąžinti";
            adoptButton.className = "return-btn";
        } else {
            adoptButton.textContent = "Atiduoti";
            adoptButton.className = "give-btn";
        }

        adoptButton.addEventListener("click", function () {
            animal.isAdopted = !animal.isAdopted;

            saveAnimals();
            displayAnimals();
            showConsoleTable();
        });

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Ištrinti";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function () {
            animals = animals.filter(
                item => item.id !== animal.id
            );

            saveAnimals();
            displayAnimals();
            showConsoleTable();
        });

        actions.appendChild(adoptButton);
        actions.appendChild(deleteButton);

        card.appendChild(actions);
        animalsList.appendChild(card);
    });
}

// =====================================
// 16. START PROGRAM
// =====================================

// Read saved data
loadAnimals();

// Create form
createForm();

// Display saved animals
displayAnimals();

// Show saved animals in Console
showConsoleTable();