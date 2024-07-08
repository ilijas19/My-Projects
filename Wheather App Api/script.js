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
// const showForecast = function () {
//   navigator.geolocation.getCurrentPosition(
//     async function (position) {
//       try {
//         const { latitude, longitude } = position.coords;
//         const apiKey = "64571ce3e8a3a8316269ff88b064d987"; // Your API key
//         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

//         const response = await fetch(url);

//         const data = await response.json();
//         console.log(data);
//       } catch (error) {
//         console.error(error);
//       }
//     },
//     function () {
//       console.error("Unable to retrieve your location");
//     }
//   );
// };
// showForecast();

document.getElementById("search-button").addEventListener("click", async () => {
  const city = document.getElementById("city-input").value;
  const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});

function displayWeather(data) {
  const currentWeather = document.getElementById("current-weather");
  currentWeather.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Humidity: ${data.main.humidity} %</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Condition: ${data.weather[0].description}</p>
  `;
}
