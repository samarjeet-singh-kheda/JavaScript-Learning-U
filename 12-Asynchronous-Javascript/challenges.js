"use strict";

"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCounty = function (data, className = "") {
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
  countriesContainer.insertAdjacentHTML("beforeend", `${msg}\n`);

  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//! ********************************************* Coding Challenge #1 *********************************************

/* 



In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

????????????????????????????????????????????      PART 1      ????????????????????????????????????????????    
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).

2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data.

3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: 'You are in Berlin, Germany'

4. Chain a .catch method to the end of the promise chain and log errors to the console

5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.



????????????????????????????????????????????      PART 2      ????????????????????????????????????????????    
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.

7. Render the country and catch any errors, just like we have done in the last lecture



!       TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
!       TEST COORDINATES 2: 19.037, 72.873
!       TEST COORDINATES 2: -33.933, 18.474


*/

const getJSON = async function (url, msg) {
  // return fetch(url).then((res) => {
  //   if (!res.ok) throw new Error(msg);

  //   return res.json();
  // });

  const res = await fetch(url);
  if (!res.ok) throw new Error(msg);
  return await res.json();
};

const whereAmI = function (lat, long) {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       const { latitude, longitude } = pos.coords;

  //       getJSON(
  //         `https://geocode.xyz/${latitude},${longitude}?geoit=json`,
  //         // `https://geocode.xyz/-3,4?geoit=json`,
  //         "Something went wrong :("
  //       )
  //         .then((data) => {
  //           if (data.city === "Throttled! See geocode.xyz/pricing")
  //             throw new Error(
  //               "Too Many requests. Please wait a little & refresh again!"
  //             );

  //           if (data.error) {
  //             const { error } = data;

  //             throw new Error(`${error.description} Error code: ${error.code}`);
  //           }

  //           alert(`You are in ${data.city}, ${data.country}.`);

  //           return getJSON(
  //             `https://restcountries.com/v3.1/name/${data.country}`,
  //             "Country not found"
  //           );
  //         })
  //         .then((data) => renderCounty(data[0]))
  //         .catch((err) => renderError(err.message));
  //     },
  //     (err) => console.error(err)
  //   );

  getJSON(
    `https://geocode.xyz/${lat},${long}?geoit=json`,
    // `https://geocode.xyz/-3,4?geoit=json`,
    "Problem with geocoding"
  )
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

      return getJSON(
        `https://restcountries.com/v3.1/name/${data.country}`,
        "Country not found"
      );
    })
    .then((data) => renderCounty(data[0]))
    .catch((err) => renderError(err.message));
};

// btn.addEventListener("click", () => whereAmI(52.508, 13.381));
// btn.addEventListener("click", () => whereAmI(19.037, 72.873));
// btn.addEventListener("click", () => whereAmI(-33.933, 18.474));

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//! ********************************************* Coding Challenge #2 *********************************************

/* 



Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉


????????????????????????????????????????????      PART 1      ????????????????????????????????????????????    
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.


????????????????????????????????????????????      PART 2      ????????????????????????????????????????????    
2. Consume the promise using .then and also add an error handler;

3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;

4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image

5. After the second image has loaded, pause execution for 2 seconds again;

6. After the 2 seconds have passed, hide the current image.




!       TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.



*/

const imageContainer = document.getElementsByClassName("images");

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.src = imgPath;

    img.addEventListener("load", () => {
      imageContainer[0].append(img);
      resolve(img);
    });

    img.addEventListener("error", () =>
      reject(new Error("Failed to load image..."))
    );
  });
};

const wait = (currentImg, nextImg) =>
  new Promise((resolve) =>
    setTimeout(() => {
      currentImg.style.display = "none";
      resolve(createImage(nextImg));
    }, 2000)
  );

// createImage("img/img-1.jpg")
//   .then((res) => wait(res, "img/img-2.jpg"))
//   .then((res) => wait(res, "img/img-3.jpg"))
//   .catch((err) => {
//     imageContainer[0].insertAdjacentText("afterbegin", err.message);
//     console.error(err);
//   });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//! ********************************************* Coding Challenge #3 *********************************************

/* 



????????????????????????????????????????????      PART 1      ????????????????????????????????????????????    
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.

Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.



????????????????????????????????????????????      PART 2      ????????????????????????????????????????????    
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';

2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')

3. Check out the 'imgs' array in the console! Is it like you expected?

4. Use a promise combinator function to actually get the images from the array 😉

5. Add the 'parallel' class to all the images (it has some CSS styles).





!       TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.


*/

const wait2 = () => new Promise((resolve) => setTimeout(resolve, 2000));

const loadNPause = async function () {
  try {
    // const img1 = await createImage("img/img-1.jpg");
    // const img2 = await wait(img1, "img/img-2.jpg");
    // await wait(img2, "img/img-3.jpg");

    const img1 = await createImage("img/img-1.jpg");
    await wait2();
    img1.style.display = "none";

    const img2 = await createImage("img/img-2.jpg");
    await wait2();
    img2.style.display = "none";

    await createImage("img/img-3.jpg");
  } catch (err) {
    imageContainer[0].insertAdjacentText("afterbegin", err.message);
    console.error(err);
  }
};

// loadNPause();

const loadAll = async function (...imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));

    const imgsEl = await Promise.all(imgs);

    imgsEl.forEach((img) => img.classList.add("parallel"));

    console.log(imgsEl);
  } catch (err) {
    console.error("ERROR:", err);
  }
};

loadAll("img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg");

const loadAllPromise = function (...imgArr) {
  return new Promise(function (resolve, reject) {
    const res = [];
    imgArr.map(async (img) => {
      const i = await createImage(img);
      res.push(i);
    });

    resolve(res);
  });
};

// loadAllPromise("img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg").then((res) =>
//   console.log(res)
// );

const createImageForAll = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.src = imgPath;

    img.addEventListener("load", () => {
      img.classList.add("parallel");
      imageContainer[0].append(img);
      resolve(img);
    });

    img.addEventListener("error", () =>
      reject(new Error("Failed to load image..."))
    );
  });
};

// Promise.all([
//   createImageForAll("img/img-1.jpg"),
//   createImageForAll("img/img-2.jpg"),
//   createImageForAll("img/img-3.jpg"),
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.error("ERROR:", err));
