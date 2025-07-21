const apiKey = "16a79b86e92a164668639eea511b052a";
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherDiv = document.getElementById("weather");

getWeatherBtn.addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();

  if (city === "") {
    weatherDiv.innerHTML = "<p>Please enter a city name</p>";
    weatherDiv.classList.remove("hidden");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      const temp = data.main.temp;
      const condition = data.weather[0].description;
      const icon = data.weather[0].icon;

      weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${temp}°C</strong> - ${condition}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${condition}" />
      `;
      weatherDiv.classList.remove("hidden");
    })
    .catch((error) => {
      weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      weatherDiv.classList.remove("hidden");
    });
});
