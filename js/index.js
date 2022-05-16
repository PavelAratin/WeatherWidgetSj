const select = document.querySelector('.select');
const bodyTown = document.querySelector('.body__town span');
const weatherApp = document.querySelector('.weather')
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
  weatherApp.querySelector('.body__img-sun').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function time() {
  const hours = new Date().getHours()
  const minutes = new Date().getMinutes()
  weatherApp.querySelector('.body__time .time').innerHTML = hours;
  weatherApp.querySelector('.body__time .minute').innerHTML = minutes;
};
setInterval(time, 1000)
