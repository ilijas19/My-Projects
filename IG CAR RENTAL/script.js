// Functions

// 0. Loading Header and Footer
async function loadHeader() {
  try {
    const response = await fetch("header.html");
    const headerHTML = await response.text();
    document.getElementById("header-placeholder").innerHTML = headerHTML;

    // Toggling menu
    document
      .querySelector(".close-icon")
      .addEventListener("click", function () {
        document.querySelector(".absolute-div").style.right = "-35rem";
        document.querySelector(".absolute-div").style.width = "0%";
      });

    document
      .querySelector(".phone-menu")
      .addEventListener("click", function () {
        document.querySelector(".absolute-div").style.right = "0";
        document.querySelector(".absolute-div").style.width = "100%";
      });

    const phoneMenuLinks = document.querySelectorAll(".absolute-item");
    phoneMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        document.querySelector(".absolute-div").style.right = "-35rem";
        document.querySelector(".absolute-div").style.width = "0%";
      });
    });
  } catch (error) {
    console.error("Error loading header:", error);
  }
}

async function loadFooter() {
  try {
    const response = await fetch("footer.html");
    const footerHTML = await response.text();
    document.getElementById("footer-placeholder").innerHTML = footerHTML;
  } catch (error) {
    console.error("Error loading footer:", error);
  }
}

// 1. Loading all cars
const getCars = async function () {
  try {
    const response = await fetch("cars.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
  }
};

// 2. Loading Featured Cars
const renderFeaturedCars = async function () {
  const cars = await getCars();
  const featuredCars = cars.filter((car) => car.featuredCar === 1);

  featuredCars.forEach((car) => {
    const html = `
    <div class="our-car">
        <div class="our-car-text-div">
          <p class="our-car-name">${car.make} ${car.model}</p>
          <ion-icon
            class="info-icon"
            name="information-circle-outline"
            ></ion-icon>
        </div>
        <img class="our-car-img" src="${car.image}" alt="our-car" />
        <p class="id"  >Car ID: ${car.id}</p>
        <div class="our-car-price-div">
          <p class="per-day">Per Day</p>
          <p class="price">${car.price_per_day} EUR</p>
          <a class="rent-btn" data-id='${car.id}'> Rent Now </a>
        </div>
      </div>
    `;
    document
      .querySelector(".explore-cars")
      .insertAdjacentHTML("beforeend", html);
  });
  addBtnEvents();
};

// 3. Loading Our Cars
const loadOurCars = async function () {
  const cars = await getCars();
  cars.forEach((car) => {
    const html = `
    <div class="our-car">
        <div class="our-car-text-div">
          <p class="our-car-name">${car.make} ${car.model}</p>
          <ion-icon
            class="info-icon"
            name="information-circle-outline"
            ></ion-icon>
        </div>
        <img class="our-car-img" src="${car.image}" alt="our-car" />
        <p class="id" >Car ID: ${car.id}</p>
        <div class="our-car-price-div">
          <p class="per-day">Per Day</p>
          <p class="price">${car.price_per_day} EUR</p>
          <a class="rent-btn" data-id='${car.id}'> Rent Now </a>
        </div>
      </div>
    `;
    document.querySelector(".our-cars").insertAdjacentHTML("beforeend", html);
  });
  addBtnEvents();
};

// 4. Filter Cars
const filterCars = async function () {
  const cars = await getCars();
  const brand = document.getElementById("car-brand").value;
  if (brand === "all") {
    document.querySelector(".our-cars").innerHTML = "";
    loadOurCars();
  } else {
    const filteredCars = cars.filter((car) => car.make === brand);
    document.querySelector(".our-cars").innerHTML = "";
    filteredCars.forEach((car) => {
      const html = `
      <div class="our-car">
          <div class="our-car-text-div">
            <p class="our-car-name">${car.make} ${car.model}</p>
            <ion-icon
              class="info-icon"
              name="information-circle-outline"
              ></ion-icon>
          </div>
          <img class="our-car-img" src="${car.image}" alt="our-car" />
          <p class="id" >Car ID: ${car.id}</p>
          <div class="our-car-price-div">
            <p class="per-day">Per Day</p>
            <p class="price">${car.price_per_day} EUR</p>
            <a class="rent-btn" data-id='${car.id}' > Rent Now </a>
          </div>
        </div>
      `;
      document.querySelector(".our-cars").insertAdjacentHTML("beforeend", html);
    });
  }
  addBtnEvents();
};

// 4.5 Event Listeners for loading cars
window.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  const footerExists = document.querySelector(".footer");
  if (footerExists) loadFooter();

  if (document.querySelector(".explore-cars")) {
    renderFeaturedCars();
  }

  if (document.querySelector(".our-cars")) {
    loadOurCars();
  }
});
let currentId;
// 5. addbBtnEvents for btns & open Rent Form tab
const addBtnEvents = function (e) {
  const rentButtons = document.querySelectorAll(".rent-btn");
  rentButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const carId = btn.getAttribute("data-id");
      // Redirect to the rent form page
      currentId = carId;
      window.location = `rentForm.html?carId=${carId}`;
      // console.log(currentId);
    });
  });
};

// 6. RENDERING MAP
const loadMap = () => {
  var map = L.map("map").setView([43.3209, 21.9267], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([43.3209, 21.9267])
    .addTo(map)
    .bindPopup("<p class='popup'>OUR LOCATION</p>")
    .openPopup();
};

const renderError = (errMsg) => {
  const errorEl = document.querySelector(".error");
  errorEl.textContent = errMsg;
};

const renderSuccess = (succMsg) => {
  const errorEl = document.querySelector(".error");
  errorEl.textContent = succMsg;
  errorEl.style.color = "green";
  errorEl.style.paddingTop = "3rem";
};

// 7. Handle DOMContentLoaded event
window.addEventListener("DOMContentLoaded", async () => {
  try {
    if (window.location.pathname.includes("rentForm.html")) {
      loadMap();
      const reservationForm = document.querySelector(".reservation-form");
      const carName = document.querySelector(".car-name");
      const confirmBtn = document.querySelector(".confirm-btn");
      const phone = document.querySelector(".phone-num");
      const confirmPhone = document.querySelector(".phone-confirm");

      const cars = await getCars();
      const searchParams = new URLSearchParams(window.location.search);
      const carId = searchParams.get("carId");

      const car = cars.find((car) => car.id == carId);

      if (car) {
        reservationForm.style.display = "flex";
        carName.textContent = `${car.make} ${car.model}`;
        confirmBtn.addEventListener("click", function (e) {
          e.preventDefault();

          if (phone.value.length < 7 || phone.value.length > 12) {
            renderError("Enter a valid phone number");
          } else if (!phone.value || !confirmPhone.value) {
            renderError("Enter phone number");
          } else if (phone.value !== confirmPhone.value) {
            renderError("Phone numbers do not match");
          } else {
            renderSuccess(
              `Your reservation for ${car.make} ${car.model} is accepted. You can collect your car at our location`
            );
            reservationForm.style.display = "none";
          }
        });
      } else {
        renderError("Car not found");
      }
    }
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});
