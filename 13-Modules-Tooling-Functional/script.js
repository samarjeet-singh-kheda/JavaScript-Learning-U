// Importing module

//?     We had to specify type attribute as (type="module") to be able to enable importing and exporting functionality & treat it like a module & not script
//?     Even if the import was at very end, it still gets hoisted to the very top
//?     Code from the imported module is executed first, no matter where the import statement is
//?     In "strict mode" by default

/** 




import "./shoppingCart"; 

//!    {} always comes with named exports
import { addToCart, totalPrice as price, tq } from "./shoppingCart.js"; //*    giving alias to the imported variable

console.log("Importing module");

// console.log(shippingCost);  //?      Can't access variables from other modules without importing (as the top level variables are private to that particular module)

addToCart("bread", 5);

console.log(price, tq);





// import * as ShoppingCart from "./shoppingCart.js"; //*     to import everything at once, it is kind a like an object created from class, it is a convention to start this with capital letter

// for (const key in ShoppingCart) {
//   const element = ShoppingCart[key];
//   console.log(element);
// }
// console.log(ShoppingCart.shippingCost);

//?     //?     there can only be one export default per module, that we can import by any name without {}
import add, { cart } from "./shoppingCart.js"; //*  usually avoid named and default exports from the same module

console.log(cart);

add("butter", 9);
add("cheese", 10);
add("jelly", 2);

console.log(cart); //*        here, "cart" is the live import from the module, otherwise it will only be equal to value imported from the module and not updated like this
//*     thus both points to the same place in the memory

//! *********************************************** TOP-LEVEL AWAIT ***********************************************
//?     Top level await are only possible in modules, not in scripts (it was made available since ES2022)
console.log("Start fetching...");

//?     This await blocks the execution of entire module, so it may be problem for long-running tasks as code below it have to wait
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);

console.log("Fetching done...");

const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  const { title, body } = data.at(-1);

  return { title, body };
};

const lastPost = getLastPost(); //!   last post have not arrived yet
console.log(lastPost);

// getLastPost()          //?     Not very clean
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

const lastPost2 = await getLastPost(); //?     top-level await can be used to avoid async IIFE or ".then()" syntax, when we are getting a returned value from an async function
console.log(lastPost2);

//*     If one module imports a module, that have a top-level await. Then, the importing module will wait for the imported module to finish the blocking code
import { shippingCost } from './shoppingCart';





//! ******************************* MODULE PATTERN (older way to implement module) *******************************
//?     The main aim of modules is encapsulate the private data & expose public API, function do the same for us
//?     We are using IIFE to make sure it is only called once, and we don't have to call it separately
//?     The goal of this function is not to reuse code to run it multiple times, we only want it to create a scope and just return data once

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost id ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} added from supplier...`);
  };

  return {
    orderStock, //*     this works because of closures (allow a function to have access to all the variables that were present at its birthplace)
    addToCart,
    cart,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart("apple", 15);
ShoppingCart2.addToCart("banana", 10);
ShoppingCart2.orderStock("banana", 10);
console.log(ShoppingCart2.cart);

//?     LIMITATIONS:-
//?     1) If we want one module per file (like ES6), we would have to create multiple scripts link them in correct order in html, so that they can access variables above them. It will also pollute the global namespace.
//?     2) We can't use module bundlers to bundle all the scripts together





//! ********************************************** COMMON JS MODULES **********************************************
//?     It is how modules used to be implemented in NodeJS, a lot of npm dependencies still use it
//?     To load an ES module in Node JS, set "type": "module" in the package.json or use the .mjs extension.

// exports.addToCart = (product, quantity) => {
//   console.log(`${quantity} ${product} added to cart successfully...`);
// };

const cart = [];

exports.cart = cart;

exports.addToCart = (product, quantity) => {
  cart.push({ product, quantity });

  console.log(`${quantity} ${product} added to cart successfully...`);
};




*/

/**
 *
 *  NPM is both a repository as well as software in our computer
 *
 *  before NPM, we used to include external libraries right in our HTML via a "script" tag. That exposes a global variable for our script to access.
 * It makes it hard, because we have to manually manage the dependencies.
 *
 *  package.json is like the configuration file of our project
 *
 * ?  There are 2 ways of running locally installed dependencies in command line:-
 * ?  1) using "npx" :  NPX stands for Node Package eXecute. It is simply an NPM package runner. It allows developers to execute any Javascript Package available on the NPM registry without even installing it.
 * ?  2)  using package.json scripts: they are used to run locally installed packages in command line using user defined alias. They also allows us to automate repetitive tasks.
 *
 *
 */

// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 15 },
  ],
  user: { loggedIn: true },
};

console.log(state.cart);

const stateClone = Object.assign({}, state);
console.log(stateClone);

state.user.loggedIn = false;
console.log(stateClone);
console.log(state);

const stateCloneDeep = cloneDeep(state);
console.log(stateCloneDeep);

state.cart.push({ product: "apple", quantity: 150 });
console.log(state);
console.log(stateClone);
console.log(stateCloneDeep);

//////////////////////////////////////////////////////////////////////////////////////////////////
//*   Just to bundle up with parcel
import add, { cart } from "./shoppingCart.js";
console.log(cart);

add("butter", 9);
add("cheese", 10);
add("jelly", 2);

console.log(cart);

//*  hmr -> means whenever we change one of the modules, it will trigger a rebuild, the new modified bundle will automatically be injected in the browser without triggering a full-page reload (it means it will maintain the state at the page. e.g. -> the login at bankist app)
if (module.hot) module.hot.accept();

//! *************************************** TRANSPILING & POLYFILLING ***************************************
//?   New features like Promises, that do not have an equivalent before ES6, can't be transpiled. They have to be polyfilled.
class Person {
  #greeting = "Hey";

  constructor(name) {
    this.name = name;

    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person("Jonas");

console.log(cart.find((el) => el.quantity >= 2));

Promise.resolve("Success").then((res) => console.log(res));

//?    Transpiling replaces new features with their ES5 equivalent (e.g. -> "let" & "const" with 'var', "arrow" functions with normal functions)
//?    Polyfilling recreates JS function & features not already available in ES5
import "core-js/stable"; //! 3rd party library used to polyfill new features
// import "core-js/stable/array/find.js";
// import "core-js/stable/";

import "regenerator-runtime"; //!     It is used to polyfill async functions
