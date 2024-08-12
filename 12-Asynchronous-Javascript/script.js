"use strict";

// const btn = document.querySelector(".btn-country");
// const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
          <h3 class="country__name">${data.name.common.toUpperCase()}</h3>
          <h4 class="country__region">${data.continents[0].toUpperCase()}</h4>
          <p class="country__row"><span>👫</span>${(
            data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
      </div>
  </article>
`;

  countriesContainer.insertAdjacentHTML("beforeend", html);

  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", `${msg}`);

  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg) {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

    return res.json();
  });
};

const getJSONnew = async function (url, errorMsg) {
  const res = await fetch(url);

  if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

  return await res.json();
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*



//! *************************************** First AJAX call: XMLHttpRequest ***************************************
function getCountryData(country) {
  const request = new XMLHttpRequest(); //  it is how AJAX calls used to be handled with events and callback functions
  //*  console.log(request);

  //     without CORS we can't access third party API from our code
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send(); // it will send the request to the above url
  //*  console.log(request.responseText);

  //?     request will be send off the request which fetches the data in background (because it is an AJAX call)
  //?     after that it will emit the load event which is listened via event listener

  //?     the execution of function could be in different order than it which it is called, it all depends on when will the data arrive
  request.addEventListener("load", function () {
    //*    console.log(request.responseText);

    const [data] = JSON.parse(request.responseText);

    console.log(data.name.common, data.languages);
    console.log(data.name.common, data.currencies);

    const html = `
        <article class="country">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common.toUpperCase()}</h3>
                <h4 class="country__region">${data.continents[0].toUpperCase()}</h4>
                <p class="country__row"><span>👫</span>${(
                  data.population / 1000000
                ).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${
                  Object.values(data.languages)[0]
                }</p>
                <p class="country__row"><span>💰</span>${
                  Object.values(data.currencies)[0].name
                }</p>
            </div>
        </article>
      `;

    countriesContainer.insertAdjacentHTML("beforeend", html);

    countriesContainer.style.opacity = 1;
  });
}

getCountryData("portugal");
getCountryData("usa");
getCountryData("bharat");
getCountryData("spain");




//! ************************************************ CALLBACK HELL ************************************************
//?   when we have lot of nested callback in order to execute asynchronous tasks, this happens for all asynchronous tasks which are handled by callbacks
const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
          <h3 class="country__name">${data.name.common.toUpperCase()}</h3>
          <h4 class="country__region">${data.continents[0].toUpperCase()}</h4>
          <p class="country__row"><span>👫</span>${(
            data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
      </div>
  </article>
`;

  countriesContainer.insertAdjacentHTML("beforeend", html);

  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighborsData = function (country) {
  //?     AJAX call country 1
  const request = new XMLHttpRequest();

  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);

    console.log(data.borders);

    //?     Render country 1
    renderCountry(data);

    //?   get neighbor countries
    data.borders.slice(0, 3).forEach((neighbor) => renderNeighbor(neighbor));
  });
};

const renderNeighbor = function (neighbor) {
  const request = new XMLHttpRequest();

  request.open("GET", `https://restcountries.com/v3.1/alpha/${neighbor}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(request.responseText);

    console.log(data.borders);

    //  Render country 1
    renderCountry(data, "neighbour");
  });
};

// getCountryAndNeighborsData("portugal");
getCountryAndNeighborsData("bharat");
// getCountryAndNeighborsData("usa");
// getCountryAndNeighborsData("russia");
// getCountryAndNeighborsData("gb");

setTimeout(() => {
  console.log("1 second have passed");
  setTimeout(() => {
    console.log("2 seconds have passed");
    setTimeout(() => {
      console.log("3 second have passed");
      setTimeout(() => {
        console.log("4 seconds have passed");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);





//! ******************************************** PROMISES & FETCH API ********************************************

const request = fetch(`https://restcountries.com/v3.1/name/portugal`);
console.log(request);

//*   ".then()" method is available on all promises when are successfully resolved
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);

//       return response.json(); //*   API data is available in response.body, but it is unreadable unless converted to JS object via ".json()" method available on response object of the fetch method

//       //*   "response.json()" is also an asynchronous method, which itself returns a promise
//     })
//     .then(function (data) {
//       console.log(data);

//       renderCountry(data[0]);
//     });
// };

//! ******* flat chain of promises, instead of callback hell
//?     ".then()" method always returns a promise, no matter we return anything or not. If we do return a value, it becomes the fulfillment value of the returned promise

const getJSON = function (url, errorMsg) {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

    return res.json();
  });
};

//?   the only way in which a fetch promise rejects is when the user loses their internet connection
// const getCountryData = function (country) {
//   // if (attempts) return;

//   attempts++;

//   // fetch(`https://restcountries.com/v3.1/name/${country}`)
//   //   .then(
//   //     (res) => res.json(),
//   //?     (err) => alert(err)
//   //   )

//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((res) => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders?.[0];

//       //!   DO NOT do this, as it again leads to a callback hell that we are trying to avoid
//       // fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`)
//       //   .then((res) => res.json())
//       //   .then((data) => renderCountry(data[0], "neighbour"));

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then((res) => res.json())
//     .then((data) => renderCounty(data[0], "neighbour"))
//     .catch((err) => {
//       console.error(`${err} 💥 💥 💥`);
//       renderError(err.message);
//     });
// };

let attempts = 0;

const getCountryData = function (country) {
  if (attempts) return;

  attempts++;

  //!   Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
    .then((data) => {
      renderCounty(data[0]);

      //!   Country 2
      const neighbor = data[0].borders?.[0];

      if (!neighbor) throw new Error("No neighbor found!!!");

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        "Neighbor not found"
      );
    })
    .then((data) => renderCounty(data[0], "neighbour"))
    .catch((err) => {
      console.error(`${err} 💥 💥 💥`);
      renderError(`Something went wrong 💥 💥 💥 ${err.message}. Try again!!!`);
    });
};

btn.addEventListener("click", () => getCountryData("spain"));
// getCountryData("alskal");
getCountryData("australia");
// getCountryData("england");




//! ******************************************** EVENT LOOP in Action ********************************************
console.log("Test Start");
setTimeout(() => {
  console.log("0 seconds have passed!");
}, 1000);
Promise.resolve("Promise 1 resolved").then((res) => console.log(res));
Promise.resolve("Promise 2 resolved").then((res) => {
  for (let i = 0; i < 10000000000; i++) {}
  console.log(res);
});
console.log("Test End");




//! ********************************************* BUILDING A PROMISE *********************************************
//?   promises are just special kind of JS objects
//?   Promise constructor takes exactly just one argument, that is an executor function
//?   As soon as the Promise constructor runs, it will automatically execute the passed in executor function immediately, it do so by passing 2 arguments in the executor function, i.e., resolve & reject functions

const lotteryPromise = new Promise((resolve, reject) => {
  console.log("Lottery draw is happening 🔮");
  setTimeout(() => {
    if (Math.random() >= 0.5)
      resolve("You WIN!!! 💰"); //*    to mark it as full filled
    else reject(new Error("You lost your money 💩"));
  }, 4000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error("Error: ", err));

//?   most of the time we just consume promises, but sometimes we build promises. Promisifying or building promises, we usually do just to wrap some old callback functions into promises.
//?   Promisifying means to convert callback based asynchronous behavior into promise based behavior

const wait = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

// wait(2)
//   .then(() => {
//     console.log("2 seconds have passed...");
//     return wait(1);
//   })
//   .then(() => console.log("1 second have passed..."));

wait(1)
  .then(() => {
    console.log("1 second have passed!!!");

    return wait(1);
  })
  .then(() => {
    console.log("2 second have passed!!!");

    return wait(1);
  })
  .then(() => {
    console.log("3 second have passed!!!");

    return wait(1);
  })
  .then(() => console.log("4 seconds have passed!!!"));

Promise.resolve("RESOLVED PROMISE?").then((x) => console.log(x)); //*   resolve and reject are static functions, which creates a new promise that is immediately resolved or rejected
Promise.reject(new Error("REJECTED?")).then((err) => console.error(err));




//! **************************************** PROMISIFYING GEOLOCATION API ****************************************

// navigator.geolocation.getCurrentPosition(
//   (position) => console.log(position),
//   (err) => console.error(err)
// );

// console.log("Top level code");

const getPosition = function () {
  // return new Promise(function (resolve, reject) {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => resolve(pos),
  //     (err) => reject(new Error(err))
  //   );
  // });

  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

getPosition()
  .then((res) => console.log(res))
  .catch((err) => console.error("Error: ", err));

const whereAmI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then((res) => {
      if (!res.ok) throw new Error("Problem with geocoding");

      return res.json();
    })
    .then((data) => {
      if (data.city === "Throttled! See geocode.xyz/pricing")
        throw new Error(
          "Problem with geocoding. Too Many requests. Please wait a little & refresh again!"
        );

      if (data.error) {
        const { error } = data;

        throw new Error(`${error.description} Error code: ${error.code}`);
      }

      console.log(`You are in ${data.city}, ${data.country}.`);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then((res) => {
      if (!res.ok) throw new Error("Country not found!!!");

      return res.json();
    })
    .then((data) => renderCounty(data[0]))
    .catch((err) => renderError(err.message));
};

btn.addEventListener("click", whereAmI);




//! ****************************** ASYNC/AWAIT (consuming promises), Try-catch block ******************************
const getPosition = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );

//*   await will stop the code execution of this function until the promise is settled
//*   the only method where result of a promise can be assigned to a variable, unlike XHL or ".then()"
//*   await blocks the code, but it is still fine since it only blocks code that are not in our main execution thread
//*   behind the scenes, async await is just syntactic sugar on ".then()"
const whereAmI = async function () {
  try {
    //?     Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //?    Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error("Problem getting location data...");

    const dataGeo = await resGeo.json();

    //?   Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );

    if (!res.ok) throw new Error("Problem getting country...");

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}.`; //*    this string will become the fulfilled value of the promise returned by the function
  } catch (err) {
    console.error(err);
    renderError(`💥 💥 💥 ${err.message}`);

    throw err; //*   here, we're rethrowing the error, without rethrowing it, the promise will always be fulfilled
    //*   we are manually rejecting the promise
  }
};

//! ******************************* HANDLING RETURNED VALUES from an Async Function *******************************
console.log("1: Will get the location");

// const city = whereAmI();
// console.log(city); //! OUTPUT --> Promise{<pending>} (JS have no way of knowing what the returned value will be, since the function is still running asynchronously in the background without blocking the code)

// whereAmI()
//   .then((city) => console.log(`2: ${city}`))
//   .catch((err) => console.error(`2: ${err}`))
//   .finally(() => console.log("3: Finished getting location"));
//?   We can't use await without async, that's to execute the above logic we are using an IIFE

(async function () {
  try {
    const city = await whereAmI();

    console.log(`2: ${city}`);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("3: Finished getting location");
  }
})();



*/

//! **************************************** RUNNING PROMISES IN PARALLEL ****************************************
const get3Countries = async function (c1, c2, c3) {
  try {
    // const res1 = await fetch(`https://restcountries.com/v3.1/name/${c1}`);
    // const res2 = await fetch(`https://restcountries.com/v3.1/name/${c2}`);
    // const res3 = await fetch(`https://restcountries.com/v3.1/name/${c3}`);

    // const [data1] = await res1.json();
    // const [data2] = await res2.json();
    // const [data3] = await res3.json();

    // console.log([
    //   data1?.capital?.[0],
    //   data2?.capital?.[0],
    //   data3?.capital?.[0],
    // ]);

    //?   "Promise.all" is a combinator function
    //?   it takes in an array of promises, and returns a new promise that is resolved when all the provided promises are resolved & rejects when any of the promise gets rejected
    //?   It is used because it runs all the promises in parallel and returns an array as a result
    //*  Running promises in sequence that are not related to each other doesn't make any sense, because they will just wait for previous promise to resolve, which is totally unrelated to them. So, it will just take more unnecessary time and doesn't make any sense
    const data = await Promise.all([
      //*    It gets short circuited when one of the promise get rejected
      getJSONnew(`https://restcountries.com/v3.1/name/${c1}`),
      getJSONnew(`https://restcountries.com/v3.1/name/${c2}`),
      getJSONnew(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data);

    console.log(data.map((country) => country?.[0]?.capital?.[0]));
  } catch (err) {
    console.error(err);
  }
};

get3Countries("Portugal", "France", "India");

//! ************************************************ Promise.race ************************************************
//*   it gets short circuited whenever a promise is settled (rejected or resolved)
//*   all of the promises gets executed in parallel & the one that is settled first becomes the resolved or rejected value of the method

(async function () {
  const res = await Promise.race([
    await getJSONnew(`https://restcountries.com/v3.1/name/japan`),
    await getJSONnew(`https://restcountries.com/v3.1/name/italy`),
    await getJSONnew(`https://restcountries.com/v3.1/name/egypt`),
  ]);

  console.log(res[0]);
})();

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("💥 💥 💥 Request took too long!");
    }, s * 1000);
  });
};

Promise.race([
  getJSONnew(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(1),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));

//! ********************************************* Promise.allSettled *********************************************
//*   always gets fulfilled and returns an array of objects for each promise no matter it gets rejected or not
//*   {status: "fulfilled", value: ...} for fulfilled promises
//*   {status: "rejected", reason: ...} for rejected promises
//*   like "Promise.all", except it never gets rejected

Promise.allSettled([
  getJSONnew(`https://restcountries.com/v3.1/name/allSettled`),
  Promise.resolve("Success"),
  Promise.reject("ERROR!"),
  Promise.resolve("Another success"),
  Promise.reject("ANOTHER ERROR!"),
  getJSONnew(`https://restcountries.com/v3.1/name/egypt`),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

//! ************************************************* Promise.any *************************************************
//*  it returns the first "fulfilled" promise, and ignores the rejected ones unless all the errors are rejected
//*   similar to Promise.race
Promise.any([
  Promise.resolve("Success"),
  getJSONnew(`https://restcountries.com/v3.1/name/allSettled2`),
  Promise.reject("ERROR!"),
  Promise.resolve("Another success"),
  Promise.reject("ANOTHER ERROR!"),
  getJSONnew(`https://restcountries.com/v3.1/name/egypt`),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

//*   When all the promises are rejected, then only it throws a "AggregateError: All promises were rejected" and gets rejected. Otherwise, it always gets fulfilled
Promise.any([
  Promise.reject("ERROR!"),
  Promise.reject("ANOTHER ERROR!"),
  Promise.reject("Third ERROR!"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
