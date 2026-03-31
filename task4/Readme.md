## Weather App

====

## Description

The Weather App is a simple  web application that allows users to fetch and view real-time weather information by entering the name of a city. It demonstrates how to interact with external APIs, process JSON data, and dynamically update the user interface.

---

## Features

### Fetch Weather Data
- Uses the Fetch API to send HTTP requests to the OpenWeatherMap API.
- Retrieves real-time weather data based on user input (city name).

### Display Weather Information
- Parses the JSON response received from the API.
- Dynamically updates the DOM to display:
  - Temperature
  - Humidity
  - Weather condition (e.g., Clear, Cloudy, Rainy)
  - City name


### Dynamic UI Updates
- Updates weather details instantly without refreshing the page.
- Provides a smooth and responsive user experience.

---

## Technologies Used

- HTML – Structure of the application  
- CSS – Styling and layout  
- JavaScript - Logic and API handling  
- Fetch API – For making HTTP requests  
- OpenWeatherMap API – Source of weather data  

---

## How It Works

1. User enters a city name in the input field.
2. The app sends a request to the OpenWeatherMap API using Fetch.
3. The API responds with weather data in JSON format.
4. The app extracts relevant information such as temperature and humidity.
5. The DOM is updated dynamically to display the results.
6. If an error occurs, an appropriate message is shown to the user.

---

