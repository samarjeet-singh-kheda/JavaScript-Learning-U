// Exporting module
console.log("Exporting module");

//*     If one module imports a module, that have a top-level await. Then, the importing module will wait for the imported module to finish the blocking code
// console.log("Start fetching, will wait here...");
// const res = await fetch("https://jsonplaceholder.typicode.com/users");
// const data = await res.json();
// console.log(data);
// console.log("Fetching done...");

/////////////////////////////////////////////////////////////

export const shippingCost = 10;
export const cart = [];

//?     Named export by just adding "export" keyword before whatever we are exporting
// if (true) {
//   export const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });

//     console.log(`${quantity} ${product} added to cart successfully...`);
//   };
// }
//?     export only needs to happen in top-level code
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });

  console.log(`${quantity} ${product} added to cart successfully...`);
};

const totalPrice = 237;
const totalQuantity = 23;

//*    giving alias to the  exporting variable
export { totalPrice, totalQuantity as tq }; //*     exporting multiple named values as named exports

//!     in default exports we do not even need to specify a name, as it expects an expression
//?     there can only be one export default per module
export default function (product, quantity) {
  cart.push({ product, quantity });

  console.log(
    `${quantity} ${product} added to cart successfully by default exported function...`
  );
}

addToCart("bread", 0);

//! ********************************************** COMMON JS MODULES **********************************************
// const { addToCart } = require("./script");
// addToCart("Onion", 12);
// addToCart("Garlic", 21);

// const cartInfo = require("./script");

// console.log(cartInfo);
// cartInfo.addToCart("Lemon", 100);
// cartInfo.addToCart("Ice", 609);

// console.log(cartInfo.cart);
