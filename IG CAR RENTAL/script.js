// Functions
//data
let cars = [];
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
    cars = data;
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

// 5. OPENING POPUP
const togglePopup = () => {
  const popupContainerEl = document.querySelector(".rent-car-popup-section");

  // Toggle between show and hide classes
  if (popupContainerEl.classList.contains("show")) {
    popupContainerEl.classList.remove("show");
    popupContainerEl.classList.add("hide");
  } else {
    popupContainerEl.classList.remove("hide");
    popupContainerEl.classList.add("show");
  }
};

const addBtnEvents = function () {
  const rentButtons = document.querySelectorAll(".rent-btn");
  rentButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const carId = Number(btn.getAttribute("data-id"));
      const car = cars.find((car) => car.id === carId);

      togglePopup();

      const popupContainerEl = document.querySelector(
        ".rent-car-popup-section"
      );
      const html = `
        <div class="popup">
          <ion-icon
            onclick="togglePopup()"
            class="popup-icon"
            name="arrow-undo-circle-outline"
          ></ion-icon>
          <h2 class="popup-heading">Confirm Reservation</h2>
          <p class="car-name">${car.make} ${car.model}</p>
          <form class="popup-form" action="">
            <input class="form-input" id="name" type="text" placeholder="Name" />
            <input class="form-input" id="email" type="email" placeholder="Email" />
            <input class="form-input" id="number" type="number" placeholder="Number" />
            <input class="form-input" id="confirm-number" type="number" placeholder="Confirm Number" />
          </form>
          <button class="reserve-btn">Reserve</button>
        </div>
      `;
      popupContainerEl.innerHTML = "";
      popupContainerEl.insertAdjacentHTML("beforeend", html);

      document.querySelector(".reserve-btn").addEventListener("click", () => {
        // Validate form inputs
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const number = document.getElementById("number").value.trim();
        const confirmNumber = document
          .getElementById("confirm-number")
          .value.trim();

        let isValid = true;
        let errorMessage = "";

        if (!name || !email || !number || !confirmNumber) {
          isValid = false;
          errorMessage = "All fields are required.";
        } else if (number !== confirmNumber) {
          isValid = false;
          errorMessage = "Number and Confirm Number must match.";
        }

        if (!isValid) {
          alert(errorMessage); // Replace with your preferred method of showing errors
          return;
        }

        // If validation passes, update popup with confirmation
        const confirmationHtml = `
          <div class="popup">
            <ion-icon
              onclick="togglePopup()"
              class="popup-icon"
              name="arrow-undo-circle-outline"
            ></ion-icon>
            <h2 class="popup-heading2">Confirmed Reservation</h2>
            <p class="car-name">${car.make} ${car.model}</p>
            <p class="popup-text">Come to our store to pick up reservation</p>
            <div class='map'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.778556011876!2d21.881534212460213!3d43.31889487099951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b70070e90dbf%3A0xfdbd476e3d4b92e9!2sCar%20Rental%20Ni%C5%A1!5e0!3m2!1sen!2srs!4v1721661537714!5m2!1sen!2srs" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        `;
        popupContainerEl.innerHTML = "";
        popupContainerEl.insertAdjacentHTML("beforeend", confirmationHtml);
      });
    });
  });
};
