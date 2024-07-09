// Exercise 1: Fetch User Data
/*
// Create an async function that fetches user data from a public API and logs the user's name and email.

// Hint: Use the JSONPlaceholder API: https://jsonplaceholder.typicode.com/users/1

async function fetchUserData(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!response.ok) {
      throw new Error(`Cant find user error: ${response.status}`);
    }
    const user = await response.json();
    console.log(user.username);
    console.log(user.email);
  } catch (error) {
    console.error(error);
  }
}
//user id
// fetchUserData(123);
*/
//

//Exercise 2: Sequential API Requests
/*
// Create an async function fetchSequentialData that fetches data from two different APIs sequentially and logs the results.

// Hint: Use the JSONPlaceholder APIs:

// https://jsonplaceholder.typicode.com/posts/1
// https://jsonplaceholder.typicode.com/comments/1

async function fetchSequentialData() {
  try {
    const response1 = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const data1 = await response1.json();

    const response2 = await fetch(
      "https://jsonplaceholder.typicode.com/comments/1"
    );
    const data2 = await response2.json();
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// fetchSequentialData();
*/
//

//Exercise 3: Concurrent API Requests
/*
// Create an async function that fetches data from two different APIs concurrently using Promise.all and logs the results.

// Hint: Use the JSONPlaceholder APIs:

// https://jsonplaceholder.typicode.com/posts/1
// https://jsonplaceholder.typicode.com/comments/1

async function fetchConcurrentData() {
  try {
    const promise1 = fetch("https://jsonplaceholder.typicode.com/posts/1");
    const promise2 = fetch("https://jsonplaceholder.typicode.com/comments/1");
    const responses = await Promise.all([
      (await promise1).json(),
      (await promise2).json(),
    ]);
    console.log(responses);
  } catch (error) {}
}

fetchConcurrentData();
*/
//

//Exercise 4: Error Handling with Async/Await
/*
// Create an async function fetchWithErrorHandling that fetches data from an API and handles potential errors using a try/catch block. Log an error message if the fetch fails.

// Hint: Use a non-existent endpoint to simulate an error:

// Endpoint: https://jsonplaceholder.typicode.com/invalidendpoint

async function fetchWithErrorHandling() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/invalidendpoint"
    );
    if (!response.ok) throw new Error("404 not found");
    const data = await response.json();
    console.log(data);
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

fetchWithErrorHandling();
*/
//

//Exercise 5: Handling Multiple API Requests
/*
// Create an async function fetchMultipleData that fetches data from multiple API endpoints concurrently using Promise.all. Handle both successful responses and errors for each request.

// Hint: Use the following JSONPlaceholder API endpoints:

// https://jsonplaceholder.typicode.com/posts/1
// https://jsonplaceholder.typicode.com/comments/1
// https://jsonplaceholder.typicode.com/albums/1

const getJson = async function (url, errorMessage = "something went wrong") {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Cant find url");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`${error}|${error.message}|`);
  }
};

async function fetchMultipleData() {
  try {
    const promise = await Promise.all([
      getJson("https://jsonplaceholder.typicode.com/posts/1"),
      getJson("https://jsonplaceholder.typicode.com/comments/1"),
      getJson("https://jsonplaceholder.typicode.com/albums/1"),
    ]);
    promise.forEach((p) => console.log(p));
  } catch (error) {
    console.error(error);
  }
}

// fetchMultipleData();
*/

//Exercise 6: Retry Mechanism for API Requests
/*
// Implement an async function retryFetch that retries fetching data from an API up to 3 times with a delay of 2 seconds between each retry if the request fails (e.g., due to network errors or server issues).

const wait = function (seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

const retryFetch = async function (url, retries = 4, delay = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt} to fetch data from ${url}`);
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Attempt ${attempt} failed: ${response.status}`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error:", error.message);
    }
    if (attempt < retries) {
      console.log(`Retrying in ${delay} seconds...`);
      await wait(delay);
    } else {
      throw new Error("Max retries reached. Unable to fetch data.");
    }
  }
};

// retryFetch("https://jsonplaceholder.typicode.com/posss/1");
*/
//

//Exercise 7: Fetch with Timeout
/*
// Create an async function that fetches data from an API with a timeout. If the fetch request takes longer than the timeout, it should throw an error.

async function fetchWithTimeout(url, sec) {
  try {
    const timeout = new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error("request took too long"));
      }, sec * 1000);
    });
    const response = await Promise.race([
      fetch(url).then((response) => {
        if (!response.ok) throw new Error("error fetching data");
        return response.json();
      }),
      timeout,
    ]);

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

fetchWithTimeout("https://jsonplaceholder.typicode.com/posts/1", 1);
*/
//

//Exercise 8: Throttled Fetch && working with multiple requests
/*
// Create an async function that fetches data from an API but ensures that it does not exceed a certain number of requests per second (throttling).

const throttledFetch = async function (urls, maxNumRequests) {
  if (maxNumRequests < urls.length)
    throw new Error("Over Maximum calls per second");
  const arr = [];

  for (let i = 0; i < urls.length; i++) {
    try {
      const res = await fetch(urls[i]);
      if (!res.ok) throw new Error(`Error fetching data from ${ulrs[i]}`);
      const data = await res.json();
      arr.push(data);
    } catch (err) {
      console.error(error);
      arr.push(null);
    }
  }
  console.log(arr[0].id);
};

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
];

throttledFetch(urls, 5);
*/
//

//PROJECT
//SELECTING ELEMENTS
const btnName = document.querySelector(".search-btn");
const btnId = document.querySelector(".search-by-id-btn");
const searchInput = document.querySelector(".search-input");
const searchInputId = document.querySelector(".search-by-id");
const mealContainer = document.querySelector(".meals-section");
const popupEl = document.querySelector(".absolute-div");
const byName = document.getElementById("searchByName");
const byId = document.getElementById("searchById");

const searchName = document.querySelector(".search-by-name");
const searchId = document.querySelector(".search-by-id");

/*
  html = `<img
        src="/img/traditional-russian-cabbage-soup-shchi-recipe-1135534-Hero_01-bd312ca096914402b392af18ad584790.jpg"
        alt=""
        class="popup-img"
      />
      <div class="popup-info">
        <div class="top-side">
          <h2 class="meal-name">Russian Soup</h2>
          <ul class="recepie-list">
            <li class="list-item">
              <p class="ingredient">Potato -</p>
              <span class="measure">1 table spoon</span>
            </li>

            <li class="list-item">
              <p class="ingredient">Potato -</p>
              <span class="measure">1 table spoon</span>
            </li>

            <li class="list-item">
              <p class="ingredient">Potato -</p>
              <span class="measure">1 table spoon</span>
            </li>

            <li class="list-item">
              <p class="ingredient">Potato -</p>
              <span class="measure">1 table spoon</span>
            </li>

            <li class="list-item">
              <p class="ingredient">Potato -</p>
              <span class="measure">1 table spoon</span>
            </li>

            <li class="list-item">
              <p class="ingredient">Potato -</p>
              <span class="measure">1 table spoon</span>
            </li>
          </ul>
        </div>
        <div class="bottom-side">
          <h2 class="recepie">Recepie</h2>
          <p class="recepie-text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi
            qui asperiores vitae voluptate iure autem aperiam! Excepturi,
            incidunt placeat facere ducimus molestiae fugiat similique rerum.
            Maiores neque alias autem quam.
          </p>
          <div class="btn-div">
            <button onclick="togglePopup()" class="close-btn">Close</button>
          </div>`;
  */
//1.
byName.addEventListener("click", function () {
  searchName.classList.remove("hidden");
  searchId.classList.add("hidden");
  btnName.classList.remove("hidden");
  btnId.classList.add("hidden");
});

byId.addEventListener("click", function () {
  searchName.classList.add("hidden");
  searchId.classList.remove("hidden");
  btnId.classList.remove("hidden");
  btnName.classList.add("hidden");
});

let dataArr = [];
let currentMeal;
let searchedMeal;
//1.1
btnName.addEventListener("click", async function () {
  try {
    const search = searchInput.value;
    if (searchInput.value === "") throw new Error("Empty input field");
    searchedMeal = search;
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    if (!response.ok) throw new Error("cant find meal");
    const data = await response.json();
    mealContainer.innerHTML = "";
    for (let d of data.meals) {
      const html = `
        <div class="meal">
          <img
            class="meal-img"
            src="${d.strMealThumb}"
            alt="meal-image"
          />
          <div class="meal-info">
            <h3 class="meal-name">${d.strMeal}</h3>           
            <p class="meal-category">${d.strCategory}</p>
            <p class="meal-area">${d.strArea}</p>
            <p class="meal-id">Meal id: ${d.idMeal}</p>
            <button class="meal-btn" data-id="${d.idMeal}">See more</button>
          </div>
        </div>
      `;
      mealContainer.insertAdjacentHTML("beforeend", html);
      dataArr.push(d);
    }
    openMeals();
    // console.log(dataArr);
  } catch (error) {
    console.error(error);
  }
});
//2.
const openMeals = function () {
  const mealButtons = document.querySelectorAll(".meal-btn");
  mealButtons.forEach((button) =>
    button.addEventListener("click", async function () {
      const mealId = button.getAttribute("data-id");
      await fetchMealDetails(mealId);
      togglePopup();
    })
  );
};
//3.
const fetchMealDetails = async function (mealId) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`
    );
    if (!response.ok) throw new Error("cant fetch data");

    const data = await response.json();
    const meal = data.meals.find((d) => d.idMeal === mealId);
    currentMeal = meal;
  } catch (error) {
    console.error(error);
  }
};
//4
const togglePopup = function () {
  popupEl.classList.toggle("hidden");
  const meal = currentMeal;
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() && measure && measure.trim()) {
      ingredients.push(
        `<li class="list-item"><p class="ingredient">${ingredient} -</p><span class="measure">${measure}</span></li>`
      );
    } else if (ingredient && ingredient.trim()) {
      ingredients.push(
        `<li class="list-item"><p class="ingredient">${ingredient}</p></li>`
      );
    }
  }
  const html = `
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="popup-img" />
  <div class="popup-info">
    <div class="top-side">
      <h2 class="meal-name">${meal.strMeal}</h2>
      <ul class="recepie-list">
        ${ingredients.join("")}
      </ul>
    </div>
    <div class="bottom-side">
      <h2 class="recepie">Recipe</h2>
      <p class="recepie-text">${meal.strInstructions}</p>
      <div class="btn-div">
        <button onclick="togglePopup()" class="close-btn">Close</button>
      </div>
    </div>
  </div>
`;
  //html
  popupEl.innerHTML = "";
  popupEl.insertAdjacentHTML("beforeend", html);
};

//search by id
btnId.addEventListener("click", async function () {
  try {
    const id = searchInputId.value;
    console.log(id);
    if (id === "") throw new Error("Empty input field");
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    if (!response.ok) throw new Error("error fetching by id");
    const data = await response.json();

    currentMeal = data.meals[0];
    console.log(currentMeal);
    togglePopup();
  } catch (error) {
    console.error(error);
  }
});
