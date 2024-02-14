// code is arranged from bottom to top in sections
("use strict");

//!  ********************************************* STRING PRACTICE *********************************************
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

for (const trip of flights.split("+")) {
  const [type, departure, arrival, time] = trip.split(";");

  console.log(
    `${type.includes("Delayed") ? "🔴" : ""} ${type
      .replaceAll("_", " ")
      .trim()} from ${departure.slice(0, 3).toUpperCase()} to ${arrival
      .slice(0, 3)
      .toUpperCase()} (${time.replace(":", "h")})`.padStart(45)
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*




//!  ************************************************* STRINGS *************************************************
const airline = "TAP Air Portugal";
const plane = "A320";

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log("B737"[0]);

console.log(airline.length);
console.log("8737".length);

console.log(airline.indexOf("r"));   //?     indexOf(e)
console.log(airline.lastIndexOf("r"));  //?    lastIndexOf(e)
console.log(airline.indexOf("Portugal"));
console.log(airline.indexOf("France"));

//!   string are immutable as they're primitive data types, thus all these methods returns a new substring and do not affect the original at all
console.log(airline.slice(4));          //?     slice(s, e)
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(" "))); //?   [begin, end)
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

console.log(airline.slice(-2)); //?    -ve indices also work for string
console.log(airline.slice(1, -1));

//!   EXAMPLE
const checkMiddleSeat = function (seat) {
  return seat.slice(-1) === "B" || seat.slice(-1) === "E";
};

console.log(checkMiddleSeat("11B"));
console.log(checkMiddleSeat("23C"));
console.log(checkMiddleSeat("3E"));

const temp = new String("jonas");
console.log(typeof temp);
console.log(typeof temp.slice(1, -1));







const airline = "TAP Air Portugal122";
console.log(airline.toLowerCase()); //?     toLowerCase()
console.log(airline.toUpperCase()); //?     toUpperCase()
// console.log(typeof airline.slice(-1, 0));

//!   EXAMPLE ---->   Fix capitalization in name
const passenger = "jOnAs";
// const lowerCaseName = passenger.toLowerCase();
// const firstLetter = lowerCaseName.slice(0, 1).toUpperCase();
// console.log(firstLetter + lowerCaseName.slice(1));
const correctFormatStr = (str) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};
console.log(correctFormatStr(passenger));

//!   EXAMPLE ---->   Comparing email
const email = "hello@jonas.io";
const loginEmail = "    HeLlo@Jonas.io \n \t";
console.log(email === loginEmail.trim().toLowerCase()); //?     trim()



*/

const trialStr = "      first \n second \t    third  \n";
console.log(trialStr.trimEnd()); //?     .trimEnd()
console.log(trialStr.trimStart()); //?     .trimStart()

//!   EXAMPLE ---->   Using replace change the format of string
const priceGB = "288,97£";
const priceUS = priceGB
  .replace(",", ".")
  .replace(priceGB[priceGB.length - 1], "$"); //?     .replace(original, new)
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";
console.log(announcement.replaceAll("door", "gate")); //?     .replaceAll(original, new)
console.log(announcement.replace(/door/g, "gate")); //!   here, regular expression is used (between / /) along with "g" (global) flag

//!   Methods that returns Booleans
const plane = "Airbus A320neo";
const plane2 = "Airbus A320neojs";
console.log(plane.includes("A320")); //?   .includes(searchStr, pos)
console.log(plane.includes("A", plane.indexOf("n")));
console.log(plane.includes("Boeing"));
console.log(plane.startsWith("Airbus")); //?     .startWith(searchStr, pos)
console.log(plane.startsWith("Airbus", 4));
console.log(plane.endsWith("neo")); //?
console.log(plane.endsWith("neo", 1)); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! GOOGLE IT (concat and reverse as well)

//!     Practice Exercise
const checkBaggage = (items) => {
  const baggage = items.toLowerCase();

  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are not allowed on board.");
  } else {
    console.log("Welcome aboard!");
  }
};

checkBaggage("I have a laptop, some Food & a Pocket Knife. ");
checkBaggage("Socks and camera.");
checkBaggage("Got some snacks and a gun for safety.");

//?       .split(sep, limit=str.length)
console.log("a+very+nice+string".split("+"));
console.log("a+very+nice+string".split("+", 0));
console.log("a+very+nice+string".split("+", 2));
console.log("a+very+nice+string".split("+", 2));
const [firstName, lastName] = "SAMARJEET SinGh".toLowerCase().split(" ");

console.log(firstName, lastName);

console.log(["Mr.", firstName, lastName.toUpperCase(), 2003, true].join(" ")); //?     arr.join(sep)

const capitalizeName = function (name) {
  // const nameArr = name.split(" ");
  // let res = "";
  // for (const nameEl of nameArr) {
  //   res += nameEl[0].toUpperCase() + nameEl.slice(1) + " ";
  // }
  // return res.slice(0, -1);

  const names = name.split(" ");
  const nameUpper = [];
  for (const n of names) {
    // nameUpper.push(n[0] + n.slice(1));
    nameUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  return nameUpper.join(" ");
};

console.log(capitalizeName("jessica ann smith davis"));
console.log(capitalizeName("gagan singh"));

//?     padding      ---->   .padEnd(maxLen, fillStr)       .padStart(maxLen, fillStr)
const message = "Go to gate 23!";
console.log(message.padStart(20, "+").padEnd(12, "*"));
console.log(message.padStart(20, "+").padEnd(30, "*"));
console.log("John".padStart(6, "Mister"));

const maskedCreditCard = function (num) {
  // const str = String(num);
  const str = num + ""; //!     another way of converting a number to a string

  return str.slice(-4).padStart(str.length, "*");
};

console.log(maskedCreditCard(11122233373732787));
console.log(maskedCreditCard("1112223337373278712"));

const enhancedCreditCardMasker = function (creditCardNum) {
  let res = "";

  for (let i = 0; i < creditCardNum.lastIndexOf(" "); i++) {
    if (creditCardNum[i] != " ") {
      res += "*";
    } else {
      res += creditCardNum[i];
    }
  }

  for (let i = creditCardNum.lastIndexOf(" "); i < creditCardNum.length; i++) {
    res += creditCardNum[i];
  }

  return res;
};

console.log(enhancedCreditCardMasker("4111 1111 1111 1111"));
console.log(enhancedCreditCardMasker("4111 1111 1111 1111 1223"));

//?   .repeat()
const message2 = "Bad weather... All Departures Delayed... ";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes waiting in line ${"🛩 ".repeat(n)}`);
};

planesInLine(3);
planesInLine(23);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ***************************************** ENHANCED OBJECT LITERAL *****************************************
//?   3 ways ES-6 made it to easy to write object literals

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat"];

const openingHours = {
  //  !!!!!  METHOD 3  (property names can be calculated)

  //! Old way
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 1, // Open 24 hours
    close: 24,
  },

  //! ES-6 way (in square brackets any expression can be written)
  [weekdays[0]]: {
    open: 12,
    close: 22,
  },
  [weekdays[1]]: {
    open: 11,
    close: 23,
  },
  ["republic"]: {
    open: 1, // Open 24 hours
    close: 24,
  },
  [`day-${4 + 5}`]: {
    open: 1,
    close: 24,
  },
};

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  //  !!!!!  METHOD 1  (Creating a copy of object in another object)
  //! Old way
  // openingHours2: openingHours,

  //! ES-6 way
  openingHours,

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // orderDelivery: function (obj) {
  //   console.log(obj);
  // },

  orderDelivery: function ({
    starterIndex = 0,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order delivered! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${address} on ${time}.`
    );
  },

  //  !!!!!  METHOD 2 (for methods)
  //! old way
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Your pasta is prepared with ${ing1}, ${ing2} and ${ing3}.`);
  },

  //!   ES-6 way (shorthand, no need to write function keyword, write arguments after property name directly)
  orderPizza(mainIngredient, ...otherIngredient) {
    let output = `Your pizza have ${mainIngredient} as main ingredient & `;

    for (let i = 0; i <= otherIngredient.length - 3; i++) {
      output += `${otherIngredient[i]}, `;
    }

    // if (otherIngredient.length >= 2) {
    //   output += `${otherIngredient[otherIngredient.length - 2]} and ${
    //     otherIngredient[otherIngredient.length - 1]
    //   } as accessories.`;
    // } else {
    //   output += `${
    //     otherIngredient[otherIngredient.length - 1]
    //   } as the accessory ingredient.`;
    // }

    output +=
      otherIngredient.length >= 2
        ? `${otherIngredient[otherIngredient.length - 2]} and ${
            otherIngredient[otherIngredient.length - 1]
          } as accessories.`
        : `${
            otherIngredient[otherIngredient.length - 1]
          } as the accessory ingredient.`;

    return output;
  },
};

/*





//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ************************************************** MAPS **************************************************

const rest = new Map();

//?     SET property
rest.set("name", "Classico Italiano");
rest.set(1, "Firenze, Italy");
console.log(rest.set(2, "Lisbon, Portugal"));

rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 12)
  .set("close", 23)
  .set(true, "We are open :D")
  .set(false, "We are closed :(");
// rest.set(true, "hallelujah");

//?     GET property
console.log(rest);
console.log(rest.get("name"));
console.log(rest.get("categories"));
console.log(rest.get(true));
console.log(rest.get(1));
console.log(rest.get("n/a"));

//!   example (2 lines)
// const time = 21;
// console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

console.log(rest.has("categories")); //?     HAS property
console.log(rest.delete(2)); //?     DELETE property
console.log(rest);

//?     CLEAR property
// rest.clear();
// console.log(rest);

console.log(rest.size); //?     SIZE property

// console.log(rest.set([1, 2], "test"));
// console.log(rest.get([1, 2])); //!   OUTPUT----->   undefined (but why???????????)
//!   it happened because both these arrays have same elements but they are stored in different places in heap memory
//!   instead following can be used :-

const arr = [1, 2, 3];
console.log(rest.set(arr, "test"));
console.log(rest.get(arr)); //!   OUTPUT-----> 'test' (works as expected :D )

// console.log(rest.set(document.querySelector("h1"), "Selected heading"));

//?   Another way of MAP initialization
const questions = new Map([
  ["question", "Which is the best programming language?"],
  [1, "C"],
  [2, "Python"],
  [3, "Javascript"],
  ["correct", 3],
  [true, "Correct"],
  [false, "Try again!"],
]);
console.log(questions);

//?   Convert object to map
// console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//! QUIZ APP
// console.log(questions.get("question"));
// for (const [key, value] of questions) {
//   if (typeof key === "number") {
//     console.log(`Option ${key}: ${value}`);
//   }
// }
// const answer = Number(prompt("Enter your answer!"));
// // console.log(answer);
// alert(questions.get(answer === questions.get("correct")));

console.log([...questions]); //?    converted map to array, just like sets

console.log([...questions.keys()]);
console.log(questions.values());
console.log(questions.entries());







////////////////////////////////////////////////////////////////////////////////////////////
//!  ************************************************** SETS **************************************************

//?   an iterable needs to be passed in the SET constructor
//?   it is just a bunch of values grouped together (like array), but it is not similar to an array because the order of elements of set is irrelevant & every element is unique
//?   set is also an iterable

const orderSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
  1,
]);
console.log(orderSet);

console.log(new Set("arguments")); //?    it is possible because string is also an iterable

console.log(orderSet.size);
console.log(orderSet.has("Pizza"));
console.log(orderSet.has("Bread"));
console.log(orderSet.add("Garlic Bread"));
console.log(orderSet.delete("Risotto"));
// orderSet.clear();
console.log(orderSet);
console.log(orderSet.keys());
console.log(orderSet.values());
console.log(orderSet.entries());

for (const order of orderSet) {
  console.log(order);
}
console.log(
  "\n********************************************************Example********************************************************\n"
);
//!      Example
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const staffUnique = [...new Set(staff)];

console.log(staffUnique);

//?     to find the number of unique positions directly
console.log(
  new Set(["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]).size
);

console.log(new Set("samarjeet singh kheda").size);









////////////////////////////////////////////////////////////////////////////////////////////
//!  ********************************************* LOOPING OBJECTS *********************************************

//? Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day} `;
}
console.log(openStr);

//? Property VALUES
const values = Object.values(openingHours);
console.log(values);

//? ENTIRE OBJECT
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key}, we open at ${open} & we close at ${close}`);
}








////////////////////////////////////////////////////////////////////////////////////////////
//!  ***************************************** OPTIONAL CHAINING (?.) *****************************************

// console.log(restaurant.openingHours.sun);
// console.log(restaurant.openingHours.sun.open);   //!   TypeError:  because we are accessing a property on undefined as sun doesn't exist in openingHours

//? to handle this
//?     METHOD - 1
// if (restaurant.openingHours.sun) {
//   console.log(restaurant.openingHours.sun.open);
// }
// if (restaurant.openingHours && restaurant.openingHours.sun) {
//   //? if multiple properties' presence need to be checked
//   console.log(restaurant.openingHours.sun.open);
// }

//?     METHOD - 2
console.log(restaurant.openingHours.sun?.open); //!   (?.) if property before it doesn't exist it returns undefined, otherwise continue

//?   Example
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
  // console.log(`For ${day}:`);
  // console.log("Opening Time:", restaurant.openingHours[day]?.open);
  // console.log("Closing Time:", restaurant.openingHours[day]?.close, "\n");

  const open = restaurant.openingHours[day]?.open ?? "N/A";
  console.log(`On ${day}, we open at ${open}`);
}

//?     Methods
console.log(restaurant.open?.(0, 1) ?? "Method doesn't exist.");
console.log(restaurant.order?.(0, 1) ?? "Method doesn't exist.");

//?     Arrays
const users = [{ name: "john", email: "hello@jonas.io" }];
console.log(users[0]?.name ?? "Array is empty");

console.log(users[1]?.name ?? "Second element do not exist.");








////////////////////////////////////////////////////////////////////////////////////////////
//!  ********************************************** FOR-OF LOOP **********************************************
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//?     in every iteration a new variable is declared that's why "const" declaration is also fine
//?     doesn't affect the original array as array elements' value is stored in the "item" variable
//?     "break" & "continue" is also valid in for-of loop
let i = 0;
for (let item of menu) {     
  item &&= "No dish";
  console.log("Item: ", item);
  console.log(`menu[${i}]: `, menu[i]);
  i++;
}
console.log(item);

console.log(menu);

for (const item of menu) {     //?       abstraction of for loops over iterable object
  console.log(item);
}

console.log([...menu.entries()]); //?    Returns an iterable of key, value pairs for every entry in the array

for (const item of menu.entries()) {
  console.log(item);
}

for (const item of menu.entries()) {
  console.log(`${item[0] + 1} : ${item[1]}`);
}

for (const [i, el] of menu.entries()) {
  //?     Same as above, just using destructuring
  console.log(`${i + 1} : ${el}`);
}







////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ************************************ LOGICAL ASSIGNMENT OPERATOR ************************************
const rest1 = {
  name: "capri",
  numGuests: 20,
  // numGuests: 0,
  // owner: null,
};

const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Giorgio",
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
//!   OR assignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

//!   nullish assignment operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

//!   AND assignment operator
// rest1.owner = rest1.owner && "<ANONYMOUS>";
// rest2.owner = rest2.owner && "<ANONYMOUS>";

rest1.owner &&= "<ANONYMOUS>";
rest2.owner &&= "<ANONYMOUS>";

console.log(rest1);
console.log(rest2);

// let tree = undefined;

// tree &&= "new value";
// console.log(tree);







//!  ************************************ NULLISH COALESCING OPERATOR (??) ************************************
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); // OUTPUT ---> 10 (should be zero)

restaurant.numGuests = undefined;
//? Only executes second part if first one is NULLISH (null or undefined)
const correctGuests = restaurant.numGuests ?? 10;
console.log(correctGuests);

//? returns first non-nullish value or last nullish value
console.log(restaurant.numGuests ?? null ?? "");
console.log(restaurant.numGuests ?? null ?? undefined);







/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!   ********************* Use ANY data type, return ANY data type (SHORT-CIRCUITING) *********************
console.log("------------ OR ------------");

//!  "OR" operator
//?   It returns the first truthy value or the last falsy value
console.log(3 || "Jonas"); // true, true
console.log("" || "Jonas"); // false, true
console.log(13 || undefined); // true, false
console.log(NaN || 0); // false, false

console.log(undefined || 0 || null || "Hello" || 12);

//!  Example (can be used to assign default values to variables)
// const guests1 = restaurant.numGuests
//   ? restaurant.numGuests
//   : "No guests present";

const guests1 = restaurant.numGuests || 10;
console.log(guests1);

restaurant.numGuests = 10; //?     Instead of writing the above ternary it can be shortened to this
console.log(restaurant.numGuests || "No guests present"); //?    Only return string if property isn't present
//? the above statement doesn't work as expected if the value is zero or (empty string)

console.log("------------ AND ------------ ");

//!  "AND" operator
//?   It returns the first falsy value or the last truthy value
console.log(3 && "Jonas"); // true, true
console.log("" && "Jonas"); // false, true
console.log(13 && undefined); // true, false
console.log(NaN && 0); // false, false

// ! Example  (can be used to execute code in second half if the first half is true)
if (restaurant.orderPizza) {
  console.log(restaurant.orderPizza("mushrooms", "spinach"));
}

console.log(
  restaurant.orderPizza &&
    restaurant.orderPizza("mushrooms", "spinach", "olives", "capsicum")
);






////////////////////////////////////////////////////////////////////////////////////////////////////////
//! **************************************** REST PATTERN ****************************************

//! ********    1) DESTRUCTURING
//?     SPREAD, because on the right hand side of "="
const arr = [1, 2, 3, ...[4, 5]];
console.log(arr);

//?     REST, because on the left hand side of "="
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(others, b, a);

//?       REST operator must be the last element
//?       there can only be one "rest" in a destructuring assignment
//?       it packs all the elements, from after the last variable, until the last one
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(otherFood, pizza, risotto);

//?       Objects
const { sat: weekends, ...weekdays } = restaurant.openingHours;
console.log(weekdays, weekends);

//! ********    2) FUNCTIONS
function add(...args) {
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum;
}

console.log(add(1, 2, 3, 4));
console.log(add(1, 2));
console.log(add(-1, 2, -2, 1));

let x = [23, 5, 11];
console.log(add(...x));

//!   Real Examples
console.log(
  restaurant.orderPizza("ing1", "ing2", "ing3", "ing4", "ing5", "ing6", "ing7")
);

console.log(
  restaurant.orderPizza("mushrooms", "onion", "capsicum", "spinach", "olives")
);

const temp = function (temp, ...rest) {
  console.log(temp);
  console.log(rest);
};

temp(1, 2, 3, 4, 5, 6, 7, 8, 9);






////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//! **************************************** SPREAD OPERATOR ****************************************
const arr = [7, 8, 9];

const badNewArr = [1, 2];
for (let i = 0; i < arr.length; i++) {
  badNewArr.push(arr[i]);
}
// console.log(badNewArr);

const newArr = [, 1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, "Samosa"];
console.log(newMenu);

// const temp = ...arr;

//?       COPYING ARRAY
const mainMenuCopy = [...restaurant.mainMenu]; //   Shallow Copy
console.log(mainMenuCopy);

//?       JOIN 2 ARRAYS
const menu = [, ...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// const jointMenu = [...mainMenuCopy, ...newMenu];
// console.log(jointMenu);

// let arr4 = [, , , , 90, , ,];
// console.log(arr4);

//? Iterables: array, string, map, sets, NOT object
//? Use spread operator only in places like arrays or function arguments which expects multiple values separated by commas
const str = "la la land";
console.log(...str);
const strArr = ["a", "b", ...str];
console.log(strArr);

//?       OBJECTS (introduced in ES2018,)
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: "Gagan" };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant }; //
restaurant.name = "Bhai ka Dhabba";
console.log(restaurant);
console.log(restaurantCopy);

//!       Example of "array spread"
const ingredients = [
  // prompt("Let's order pasta! Ingredient 1?"),
  // prompt("Ingredient 2?"),
  // prompt("Ingredient 3?"),
];
console.log(...ingredients);

restaurant.orderPasta(...ingredients);





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// !      APPLICATION of OBJECT DESTRUCTURING for "function parameters"
restaurant.orderDelivery({
  time: "21:30",
  address: "Dwarakapuri, Indore",
  starterIndex: 3,
  mainIndex: 2,
});

restaurant.orderDelivery({
  starterIndex: 2,
  address: "Palasia, Indore",
});



//! **************************************** OBJECT DESTRUCTURING ****************************************

const { name, openingHours, categories } = restaurant; //? variable names should exactly match the object's property names
console.log(name, openingHours, categories); //? Order of property does not matter in the object, so no holes are required

//?       Different property name can be used in this way, but reference to the property names needs to be made
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//!       DEFAULT VALUES
const {
  menu = [],
  starterMenu: starter = [],
  test = { testing: [2, "a"], moreTesting: Symbol("yo") },
} = restaurant;
console.log(menu, starter, test);

//!       MUTATING VARIABLES
let a = 111;
let b = 999;
const  = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

//!      NESTED OBJECT DESTRUCTURING
const {
  openingHours: {
    thu: { open: o, close: c, mid: m = "Not mentioned" },
  },
} = restaurant;
console.log(o, c, m);









//! **************************************** ARRAY DESTRUCTURING ****************************************
const arr = ["a", 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// let [x, y, z] = arr;
const [x, y, z] = arr; //?      Destructuring operator
console.log(x, y, z);
console.log(arr); //?       Do not affect the original array

//?      Not all array elements need to be stored,
//?      we can leave holes for elements we don't wish to store
let [main, , secondary] = restaurant.categories;

console.log(main, secondary);

// const temp = secondary;
// main = secondary; //!       Can't reassign to "const"
// secondary = temp;
// console.log(main, secondary);

//!      Destructuring can be used to "SWAP VARIABLES"
[main, secondary] = [secondary, main];
console.log(main, secondary);

let a1 = 2;
let a2 = 9;
[a1, a2] = [a2, a1];
console.log(a1, a2);

const [, , , g, l] = [2, 4, 5, 1, 0, 8];
console.log(g, l);

//!      Receiving multiple return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//!      NESTED DESTRUCTURING
const nested = [2, 3, [4, 5]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

//!      DEFAULT VALUES (in case we don't know array length and want to avoid undefined)
const [p = 1, q = 1, r = 99] = [2, 8];
console.log(p, q, r); //?       OUTPUT ----> 2 8 99



*/
