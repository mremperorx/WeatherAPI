import { scaleSwitch, temperatures } from "./main";

function changeScale(): void {
  if (scaleSwitch.checked) {
    toggleFahrenheit();
  } else {
    toggleCelsius();
  }
}
// https://www.thoughtco.com/fahrenheit-to-celsius-formula-609230
// aici am folosit formula din link de mai sus.
function toggleFahrenheit(): void {
  temperatures.map((temp: Element) => {
    temp.innerHTML =
      Math.round((5 / 9) * (parseInt(temp.innerHTML) - 32)).toString() + "&deg";
  });
}
//
function toggleCelsius(): void {
  temperatures.map((temp: Element) => {
    temp.innerHTML =
      Math.round((9 / 5) * parseInt(temp.innerHTML) + 32).toString() + "&deg";
  });
}

export { changeScale };
