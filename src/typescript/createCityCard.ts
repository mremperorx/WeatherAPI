import { displayCards, save, scaleSwitch, cities } from "./main";

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

export function createCityCard(data: any): void {
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

let temperatures = [...Array.from(document.querySelectorAll(".temperature"))];
