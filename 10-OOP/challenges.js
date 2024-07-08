"use strict";

//!         Coding Challenge #1

/* 


1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h



*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = `${speed} km/h`;
};

Car.prototype.accelerate = function () {
  this.speed = `${Number.parseInt(this.speed) + 10} km/h`;

  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed = `${Number.parseInt(this.speed) - 5} km/h`;

  console.log(this.speed);
};

const bmw = new Car("BMW", 120);
console.log(bmw);
bmw.accelerate();
bmw.brake();

const mercedes = new Car("Mercedes", 95);
console.log(mercedes);
mercedes.accelerate();
mercedes.brake();

//!      Coding Challenge #2

/* 


1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h



*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = `${speed} km/h`;
  }

  accelerate() {
    this.speed = `${Number.parseInt(this.speed) + 10} km/h`;

    console.log(this.speed);
  }

  brake() {
    this.speed = `${Number.parseInt(this.speed) - 5} km/h`;

    console.log(this.speed);
  }

  get speedUS() {
    return `${(Number.parseInt(this.speed) / 1.6).toFixed(2)} mi/h`;
  }

  set speedUS(speed) {
    this.speed = `${speed * 1.6} km/h`;
  }
}

const ford = new CarCl("Ford", 120);
console.log(ford);
console.log(ford.speedUS);
ford.accelerate();
ford.brake();
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford.speed);

//!      Coding Challenge #3

/*


1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%



*/

const Car3 = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car3.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car3.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const Ev = function (make, speed, charge) {
  Car3.call(this, make, speed);
  this.charge = charge;
};

Ev.prototype = Object.create(Car3.prototype);

Ev.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

Ev.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;

  console.log(
    `'${this.make}' going at ${this.speed} km/h, at a speed of ${this.charge}%`
  );
};

const tesla = new Ev("Tesla", 120, 23);
console.log(tesla);

tesla.chargeBattery(26);
console.log(tesla);

tesla.accelerate();
tesla.brake();

//!      Coding Challenge #4

/* 


1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chaining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%



*/

class CarCl4 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;

    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;

    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed *= 1.6;
  }
}

class EvCl4 extends CarCl4 {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);

    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge -= 1;

    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%.`
    );

    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;

    return this;
  }

  brake() {
    this.speed -= 10;

    console.log(`The updated speed is ${this.speed} km/h.`);

    return this;
  }
}

const rivian = new EvCl4("Rivian", 120, 23);
console.log(rivian);

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.make);
console.log(rivian.speed);
console.log(rivian.speedUS);
