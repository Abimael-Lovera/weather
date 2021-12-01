const API_KEY = '77b7671d6db73ca4c4171f54bde1a73b';
const fetchData = position => {
	const { latitude, longitude } = position.coords;
	fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
		.then(response => response.json())
		.then(data => setWeatherData(data));
	console.log(position);
};
const setWeatherData = data => {
	console.log(data);
	const weatherData = {
		location: data.name,
		description: data.weather[0].description,
		humidity: 'Humidity: ' + data.main.humidity,
		pressure: 'Pressure: ' + data.main.pressure,
		temperature: 'Temperature: ' + data.main.temp + '°',
		date: getDate()
	};
	Object.keys(weatherData).forEach(key => {
		document.getElementById(key).textContent = weatherData[key];
	});
	cleanUp();
};
const container = document.getElementById('container');
const loader = document.getElementById('loader');
const cleanUp = () => {
	loader.style.display = 'none';
	container.style.display = 'flex';
};
const getDate = () => {
	let date = new Date();
	return `${date.getDate()}-${('0' + date.getMonth() + 1).slice(-2)}-${date.getFullYear()}`;
};
const onload = () => {
	navigator.geolocation.getCurrentPosition(fetchData);
};
