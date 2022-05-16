const select = document.querySelector('.select');
const bodyTown = document.querySelector('.body__town span');
const weatherApp = document.querySelector('.weather');
const btns = document.querySelectorAll('.footer__btns-btn');

select.addEventListener('change', function (e) {
  let town = e.target.value;
  bodyTown.innerHTML = e.target.value;
  getApiWeather(town)
});


function getApiWeather(town) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${town}&lat={lat}&lon={lon}&units=metric&lang=ru&appid=46f85b6f2ff816e2fb4d9bad75876c62`
  fetch(api)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      parseDataArray(data)
    });
};
getApiWeather(select.value)

function parseDataArray(data) {
  console.log(data);
  weatherApp.querySelector('.body__degrees').innerHTML = Math.floor(data.main.temp);
  weatherApp.querySelector('.body__temp-real').innerHTML = Math.floor(data.main.temp);
  weatherApp.querySelector('.body__temp-real-feel').innerHTML = Math.floor(data.main.feels_like);
  weatherApp.querySelector('.body__feel--preasure').innerHTML = Math.floor(data.main.pressure);
  weatherApp.querySelector('.body__feel--precipitation').innerHTML = data.weather[0].description;
  weatherApp.querySelector('.body__wind').innerHTML = Math.floor(data.wind.speed);
  weatherApp.querySelector('.body__img-sun').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function time() {
  const hours = new Date().getHours()
  const minutes = new Date().getMinutes()
  weatherApp.querySelector('.body__time .time').innerHTML = hours;
  weatherApp.querySelector('.body__time .minute').innerHTML = minutes;
};
setInterval(time, 1000);

btns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const currentCount = Number(this.dataset.count);
    sort(currentCount)
  });
});

function sort(currentCount) {
  const footerListDays = document.querySelector('.footer__list-days');
  let htmlContent = '';
  for (let i = 0; i < currentCount; i++) {
    htmlContent += `
    <li class="footer__list-days-item">
    <p class="footer__list-days-day">Сегодня</p>
    <span class="footer__list-days-month">28 авг</span>
    <img class="footer__list-days-img" src="/img/weather-sun.svg" alt="Солнечная погода">
    <p class="footer__list-days-deg">+18°</p>
    <span class="footer__list-days-deg-feel">+15°</span>
    <span class="footer__list-days-weather">Облачно</span>
  </li>
    `
  }
  footerListDays.innerHTML = htmlContent;
}
