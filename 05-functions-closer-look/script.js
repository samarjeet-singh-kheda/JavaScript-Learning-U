"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ******************************************* DEFAULT PARAMETERS *******************************************
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
  //?     it is the only way to use parameters before it, so order matters here
) {
  //
  //?     old ES-5 way
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  bookings.push(booking);
};

createBooking("A123"); //!     OUTPUT --->      { flightNum: 'A123', numPassengers: 1, price: 199 },
createBooking("AV12", 67, 80000); //!     OUTPUT --->   { flightNum: 'AV12', numPassengers: 67, price: 80000 },
createBooking("A123", 3); //!     OUTPUT --->    { flightNum: 'A123', numPassengers: 3, price: 597 },

//?     using undefined is the only way to skip an argument so that, it can be assigned the default value
createBooking("A123", undefined, 6); //!     OUTPUT --->    { flightNum: 'A123', numPassengers: 1, price: 6 },

//?     unlike undefined, using "null" do not skip the argument, it just assigns the null value to the parameter
createBooking("A123", null, 6); //!     OUTPUT --->     { flightNum: 'A123', numPassengers: 1, price: 6 }

console.log(bookings);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ******************************************* *******************************************

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ******************************************* *******************************************

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ******************************************* *******************************************

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!  ******************************************* *******************************************
