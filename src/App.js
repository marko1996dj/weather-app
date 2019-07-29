import React, { Component } from 'react';
import './App.css';

import Day from './Day/Day';

import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			API_key: '7c322888d234d1fc7dc225ad7e3e1e03',
			weatherData: null,
			weeklyWeatherData: null,
			value: null
		};
		this.handleChange = this.handleChange.bind(this);
	}

	getCurrentWeatherData = () => {
		let dailyUrl = `https://api.openweathermap.org/data/2.5/find?q=${this.state.value}&units=metric&lang=hr&appid=${this
			.state.API_key}`;
		axios
			.get(dailyUrl)
			.then((res) => {
				const weatherData = res.data;
				this.setState({ weatherData: weatherData });
			})
			.catch((e) => {
				this.setState({ weatherData: null });
				console.log(e);
			});
	};

	getWeeklyWeatherData = () => {
		let weeklyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state
			.value}&units=metric&lang=hr&appid=${this.state.API_key}`;
		axios
			.get(weeklyUrl)
			.then((res) => {
				const weeklyWeatherData = res.data;
				this.setState({ weeklyWeatherData: weeklyWeatherData });
			})
			.catch((e) => {
				console.log(e);
			});
	};

	handleChange = (e) => {
		// e.preventDefault();
		this.setState({ value: e.target.value });
	};

	render() {
		let dailyData;
		if (this.state.weeklyWeatherData) {
			const fiveDayData = this.state.weeklyWeatherData.list.filter(d => d.dt_txt.split(' ')[1] === this.state.weeklyWeatherData.list[0].dt_txt.split(' ')[1])
			console.log(fiveDayData);
			dailyData = fiveDayData.map((data, index) =>(
				<Day 
					key={index}
					temperature={data.main.temp}
					iconUrl = {`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
				/>
			))
		}
	
		let city, temperature, humidity, clouds, iconUrl, icon;
		if (this.state.weatherData) {
			if (this.state.weatherData.count > 0) {
				city = <p>Grad: {this.state.weatherData.list[0].name}</p>;
				temperature = <p>Temperatura: {this.state.weatherData.list[0].main.temp}°C</p>;
				humidity = <p>Vlaznost vazduha: {this.state.weatherData.list[0].main.humidity}%</p>;
				clouds = <p>Oblaci: {this.state.weatherData.list[0].weather[0].description}</p>;
				iconUrl = `http://openweathermap.org/img/w/${this.state.weatherData.list[0].weather[0].icon}.png`;
				icon = <img src={iconUrl} alt={'alt text'} />;
			}
		}
		return (
			<React.Fragment>
				<input type="text" placeholder="grad" onChange={this.handleChange} />
				<button onClick={this.getCurrentWeatherData}>Get Current Weather Data</button>
				<button onClick={this.getWeeklyWeatherData}>Get Weekly Weather Data</button>
				{city}
				{temperature}
				{humidity}
				{clouds}
				{icon}
				<div style={{display: 'flex'}}>
					{dailyData}
				</div>
				
			</React.Fragment>
		);
	}
}

export default App;
