import { toggleErrorModal } from "./modal";
import { changeScale } from "./scalecheck";

const form = <HTMLFormElement>document.querySelector("form");
const input = <HTMLInputElement>document.querySelector(`input[type="text"]`);
const weatherCardsContainer = <HTMLDivElement>(
  document.querySelector(".weather-cards-container")
);
const scaleToggleContainer = <HTMLDivElement>(
  document.querySelector(".scale-container")
);
const scaleSwitch = <HTMLInputElement>(
  document.querySelector("#temperature-scale")
);
const locationBtn = <HTMLButtonElement>document.querySelector("#btn");

let cities = JSON.parse(localStorage.getItem("cities") || "[]");

displayCards();
window.addEventListener(
  "load",
  () => (weatherCardsContainer.style.opacity = "1")
);

class City {
  city: string;
  temperature: string;
  icon: string;
  description: string;
  constructor(
    city: string,
    temperature: string,
    icon: string,
    description: string
  ) {
    this.city = city;
    this.temperature = temperature;
    this.icon = icon;
    this.description = description;
  }
}

function save(): void {
  localStorage.setItem("cities", JSON.stringify(cities));
}

async function getWeather(): Promise<void> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=191210cdbee0c2e5d85f1e8ef6320d1c`,
      { mode: "cors" }
    );
    const data = await response.json();
    createCityCard(data);
    scaleToggleContainer.style.display = "block";
    console.log(data);
  } catch {
    toggleErrorModal();
  }
}

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(DisplayWeather);
  }
});

function DisplayWeather(position) {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=3573b251c5e5d46c32adca397365012a`
  )
    .then((response) => response.json())
    .then((data) => ShowWeather(data));
}

function ShowWeather(data: any): void {
  const cityAndCountry = `${data["name"]}, ${data["sys"]["country"]}`;
  const realTemperature =
    Math.round((data["main"]["temp"] * 9) / 5 + 32).toString() + "&deg";
  const icon = `<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]}.svg">`;
  const description = data["weather"][0]["main"];
  const cityCard = new City(cityAndCountry, realTemperature, icon, description);

  cities.push(cityCard);
  displayCards();
  scaleSwitch.checked = false;
  temperatures = [...Array.from(document.querySelectorAll(".temperature"))];
  save();
}

function createCityCard(data: any): void {
  const cityAndCountry = `${data["name"]}, ${data["sys"]["country"]}`;
  const realTemperature =
    Math.round(((data["main"]["temp"] - 273.15) * 9) / 5 + 32).toString() +
    "&deg";
  const icon = `<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]}.svg">`;
  const description = data["weather"][0]["main"];
  const cityCard = new City(cityAndCountry, realTemperature, icon, description);

  if (description == "Clear") {
    document.body.style.backgroundImage = "url(src/images/clear.gif)";
  } else if (description == "Clouds") {
    document.body.style.backgroundImage = "url('src/images/clouds.gif')";
  } else if (description == "Haze") {
    document.body.style.backgroundImage = "url('src/images/Haze.gif')";
  } else if (description == "Rain") {
    document.body.style.backgroundImage = "url('src/images/Rain.gif')";
  } else if (description == "Snow") {
    document.body.style.backgroundImage = "url('src/images/Snow.gif')";
  } else if (description == "Thunderstorm") {
    document.body.style.backgroundImage = "url('src/images/Thunderstorm.gif')";
  }

  cities.push(cityCard);
  displayCards();
  scaleSwitch.checked = false;
  temperatures = [...Array.from(document.querySelectorAll(".temperature"))];
  save();
}

function displayCards(): void {
  if (cities.length === 0) {
    weatherCardsContainer.textContent = "hi";
  }

  weatherCardsContainer.innerHTML = cities
    .map((city: any, i: number) => {
      return `<div class="display" id="display" data-index=${i}">
      <span class="close">x</span>
      <h2 class="name">${city.city}</h2>
      <p class="icon">${city.icon}</p>
      <p class="temperature">${city.temperature}</p>
      <p class="description">${city.description.toUpperCase()}</p>
    </div>`;
    })
    .join("");

  const closeIcons = [...Array.from(document.querySelectorAll(".close"))];
  closeIcons.forEach((icon) =>
    icon.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const parent = target.parentElement;
      parent?.remove();
      cities.splice(parent?.dataset.index, 1);
      save();
    })
  );
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather();
  form.reset();
});
scaleSwitch.addEventListener("click", changeScale);

let temperatures = [...Array.from(document.querySelectorAll(".temperature"))];

export { scaleSwitch, temperatures };
