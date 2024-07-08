"use strict";

/** 


//! ************************************ CONSTRUCTOR FUNCTION, NEW OPERATOR ************************************

//      we can use constructor function to build an object using a function
//      constructor function is actually a completely normal function
//      the only difference between a constructor and a regular function is we call a function with "new" operator
//      conventionally, constructor function starts with capital letters, (like built-in constructors Array(), Map())
//      only function declarations as well as function expressions works as constructor functions, but arrow function do not work because they don't have their own "this" keyword

//?   constructor function is not a feature of JS, it is a pattern developed by other developers
const Person = function (firstName, birthYear) {
  //*   instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //*   methods
  //!     NEVER USE THIS (bad practice, never create method in a constructor function);       It will create multiple copies of the same function
  //?      to solve this problem, PROTOTYPES are used
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

//?   What happens when a function is called with new keyword?
//      1.  a new {} (empty object) is created
//      2.  the function is called, in the function called the "this" keyword is set to this newly created object, i.e.,    in the execution context of Person function "this" keyword will point to the newly created object
//      3.  the newly crated object is linked to the prototype
// (this step creates a "__proto__" property, and set its value to the prototype property of function that is being called)
//      4. function automatically returns {} (the empty object)

//?      constructor functions have been used since the beginning of JS to simulate classes, so we can still say that we created instances of "Person"
const jonas = new Person("Jonas", 1999);
console.log(jonas);

const gagan = new Person("Gagan", 2003);

const jay = "uce";

console.log(jonas instanceof Person);
console.log(jay instanceof Person);

// const temp = (fName, lName) => console.log("Temp called successfully"); //?     TypeError: temp is not a constructor
// new temp("lal", "singh");




//! ************************************************* PROTOTYPE *************************************************

//    each and every functions in JS automatically have a property called prototype
//    any object created by a constructor function will get access to all the methods and properties that we define on the constructor prototype property

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};

jonas.calcAge();

console.log(Person.prototype);

console.log("Jonas:", jonas);
console.log("Jonas:", jonas.__proto__);
//    it gives prototype of the object, not prototype property

console.log(jonas.__proto__ === Person.prototype);
//    the prototype of an object is the prototype property of the constructor function
//      Person.prototype is not the prototype of the "Person", instead it is the prototype that gonna be used for all the objects created by "Person" constructor

console.log(Person.prototype.isPrototypeOf(jonas)); //!    OUTPUT --> true
console.log(Person.prototype.isPrototypeOf(Person)); //!    OUTPUT --> false

Person.prototype.species = "Homo Sapiens";
console.log(jonas.species, gagan.species);

console.log(jonas.hasOwnProperty("species"));
console.log(jonas.hasOwnProperty("firstName"));
console.log(Person.prototype.hasOwnProperty("species"));




//! ******************************** PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS ********************************
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(jonas.__proto__.constructor);
console.dir(Person.prototype.constructor);

const arr = [1, 2, 2, 3, 4, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

Array.prototype.uniqueElements = function () {
  return [...new Set(this)];
};

console.log(arr.uniqueElements());

const h1 = document.querySelector("h1");
console.dir(h1);

console.dir((x) => x + 1);




//! ************************************************ ES6 CLASSES ************************************************
//?   classes are a special type of function, that's why they can also be assigned to a variable

//?   class expression
const PersonCl2 = class {};

//?   class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  //!     INSTANCE METHODS
  //?    all the methods declared within the class will be added to .prototype property, not the object
  calcAge() {
    console.log(2024 - this.birthYear);
  }

  greet() {
    console.log(`Hi, ${this.fullName}!`);
  }

  get age() {
    return 2024 - this.birthYear;
  }

  //?    set a property that already exist
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  //!     STATIC METHOD
  static hey() {
    console.log("Hey there! 👋");
    console.log(this);
  }
}

const jessica = new PersonCl("jessica davis", 2003);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey, ${this.firstName}!`);
// };
jessica.greet();
// jessica.hey();
PersonCl.hey();

//    1.  Classes are NOT hoisted (unlike regular functions)
//    2.  Classes are first-class citizens (because they are just special type of function behind the scenes)
//    3.  The entire code within the classes is always executed in strict mode (even if not explicitly mentioned in the script)

const walter = new PersonCl("Walter White", 2003);




//! ********************************************* GETTERS & SETTERS *********************************************
const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 3000],

  get latest() {
    return this.movements.at(-1);
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 12;
console.log(account.latest);




//! *********************************************** STATIC METHOD ***********************************************
//?   static methods are not available on instances but can be used for a helper function about a class or a constructor function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.hey = function () {
  console.log("Hey there! 👋");
  console.log(this); //?    here, "this" === Person, because it is calling the method
};

Person.hey();

const personObj = new Person("Jotaro", 1212);
console.log(personObj);




//! *********************************************** Object.create ***********************************************
//?   used to manually set the prototype of an object, to any other object that we want
//?   it creates a new object, and the prototype of that object will be the object passed in
//?   here, there is no "new" keyword, constructor function or its prototype property, but we can still implement prototype chain

const PersonProto = {
  calcAge() {
    console.log(2024 - this.birthYear);
  },

  init(firstName, birthYear) {
    //?    used because there is no built-in constructor function or method here
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); //*    returns an empty object with the mentioned prototype
console.log(steven);
steven.name = "Steven";
steven.birthYear = 2007;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);
console.log(steven.__proto__.__proto__);
console.log(steven.__proto__.__proto__.__proto__);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 2020);
sarah.calcAge();




//! *************************** INHERITANCE BETWEEN "classes": Constructor functions ***************************

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2024 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear); //*   because in a regular function call (without "new"), "this" is set to undefined

  this.course = course;
};

//?   Linking Prototype
Student.prototype = Object.create(Person.prototype);
// Student.__proto__ = Person.prototype;

Student.prototype.introduce = function () {
  console.log(
    `Hello! My name is ${this.firstName} and I study ${this.course}.`
  );
};

const mike = new Student("Mike", 2020, "CSE");
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike.__proto__.__proto__.__proto__);
console.log(mike.__proto__.__proto__.__proto__.__proto__);

console.log(mike instanceof Student); //!     OUTPUT --->  true
console.log(mike instanceof Person); //!      OUTPUT --->   true
console.log(mike instanceof Object); //!      OUTPUT --->   true
// console.log(mike instanceof null);  //!  Invalid

console.dir(Student.prototype.constructor); //!    OUTPUT ---> Person (instead of Student), because it was created by Object.create

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);





//! ********************************* INHERITANCE BETWEEN "classes": ES6 Classes *********************************

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2024 - this.birthYear);
  }

  get age() {
    return 2024 - this.birthYear;
  }

  set fullName(name) {
    name.includes(" ")
      ? (this._fullName = name)
      : alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log(`Hey there!`, this);
  }
}

//?   if we don't need a new property then, we don't even need to specify a constructor in the child class
class StudentCl2 extends PersonCl {}

const mike = new StudentCl2("Mikey Dev", 2015);
console.log(mike);

//
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //*   "super" must be called first, it creates the "this" keyword for the child class, without "super" child class will throw error

    super(fullName, birthYear); //*   constructor function of the parent class

    this.course = course;
  }

  introduce() {
    console.log(`Hey! I am ${this.fullName} & I study ${this.course}`);
  }

  //?   shadowing the method of same name in parent class
  calcAge() {
    console.log(
      `I'm ${this.age} years old, but as a student I feel like ${this.age + 10}`
    );
  }
}

const martha = new StudentCl("Martha Jones", 2012, "CSE");
console.log(martha);
martha.introduce();
martha.calcAge();




//! ******************************** INHERITANCE BETWEEN "classes": Object.create ********************************
const PersonProto = {
  calcAge() {
    console.log(2024 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
steven.init("Steven", 1991);
console.log(steven);

const StudentProto = Object.create(PersonProto);
console.log(StudentProto);

StudentProto.init = function (firstName, birthYear, course) {
  StudentProto.__proto__.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`Hey! I'm ${this.firstName} & I study ${this.course}`);
};

const student1 = Object.create(StudentProto);
student1.init("Student1", 1999, "CSE");
console.log(student1);
student1.calcAge();
student1.introduce();



*/

//! ************************************************ ENCAPSULATION ************************************************
//?     true encapsulation do not exist in JS, but to fake it we use a convention of adding underscore ("_") before the properties and methods that we wish to be inaccessible outside the class
//?     in reality, these methods can still be accessed outside the class

//!   In classfield proposal, there are 8 different kinds of fields and proposals:-
/**
 *
 *!    Public fields
 *!    Private fields
 *!    Public methods
 *!    Private methods
 * (static versions of these fields and methods)
 */
class Account {
  //!    1) Public fields
  //*   a field is a property that will be on all instances (we can also call it public instance field)
  //*   they are on instances, they are not on the prototype
  locale = navigator.language;

  //!     2) Private fields (on instances, not prototype)
  #movements = [];
  #pin; //?   there is no other way of making a field private whose value is set by the instance itself

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    this.locale = navigator.language;

    //*   protected property
    this.#pin = pin;
    // this._movements = [];

    console.log(`Thanks ${this.owner} for opening an account with us`);
  }

  //!     3) Public methods (all these methods are public by default)
  //*   Public interface
  //?   it is common to use getMethod, instead of actual getters and setters
  getMovements() {
    return this.#movements;
  }

  //*   APIs to hide details and simplify interaction with "movements.push()" & "movements.pop()" directly
  deposit(mov) {
    this.#movements.push(mov);

    return this;
  }

  withdraw(mov) {
    this.deposit(-mov);

    return this;
  }

  //*     protected method
  // _approveLoan(val) {
  //   return this.#movements.length >= 3;
  // }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved!");
    } else {
      console.log("Loan denied!");
    }

    return this;
  }

  //!     4) Private methods (not even visible on prototype of the object)
  #approveLoan(val) {
    return this.#movements.length >= 3;
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);
console.log(acc1);

acc1.deposit(100);
acc1.deposit(120);
acc1.deposit(4000);
acc1.withdraw(120);

acc1.requestLoan(150);
console.log(acc1.getMovements());
// console.log(acc1._pin);

//  console.log(acc1.#movements); //? Property '#movements' is not accessible outside class 'Account' because it has a private identifier.

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
