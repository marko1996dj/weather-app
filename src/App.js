import React, { Component } from 'react';
import './App.scss';

import Day from './Day/Day';

import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			API_key: '7c322888d234d1fc7dc225ad7e3e1e03',
			weatherData: null,
			weeklyWeatherData: null,
			locationWeatherData: null,
			value: null,
			latitude: '',
			longitude: '',
			inputStyle: {
				opacity: '0'
			},
			buttonStyle: {
				opacity: '0'
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.getMyLocationWeather = this.getMyLocationWeather.bind(this);
		this.addStyle = this.addStyle.bind(this);
	}

	getWeatherData = () => {
		this.getCurrentWeatherData();
		this.getWeeklyWeatherData();
	};

	getCurrentWeatherData = () => {
		let dailyUrl = `https://api.openweathermap.org/data/2.5/find?q=${this.state.value}&units=metric&appid=${this
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
			.value}&units=metric&appid=${this.state.API_key}`;
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

	getMyLocationWeather = () => {
		const location = window.navigator && window.navigator.geolocation;
		if (location) {
			location.getCurrentPosition(
				(position) => {
					let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords
						.latitude}&lon=${position.coords.longitude}&units=metric&appid=${this.state.API_key}`;
					axios
						.get(url)
						.then((res) => {
							const weatherData = res.data;
							this.setState({ locationWeatherData: weatherData });
						})
						.catch((e) => {
							console.log(e);
						});
				},
				(error) => {
					this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' });
				}
			);
			location.getCurrentPosition(
				(position) => {
					let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords
						.latitude}&lon=${position.coords.longitude}&units=metric&appid=${this.state.API_key}`;
					axios
						.get(url)
						.then((res) => {
							const weeklyWeatherData = res.data;
							this.setState({ weeklyWeatherData: weeklyWeatherData });
						})
						.catch((e) => {
							console.log(e);
						});
				},
				(error) => {
					this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' });
				}
			);
		}
	};

	addStyle = () => {
		let inputStyle, buttonStyle;
		if (this.state.inputStyle.opacity === '1') {
			inputStyle = {
				width: '0px',
				transitionDuration: '.5s',
				opacity: '0'
			};
			buttonStyle = {
				opacity: '0'
			};
		} else {
			inputStyle = {
				width: '240px',
				transitionDuration: '.5s',
				opacity: '1'
			};
			buttonStyle = {
				opacity: '1'
			};
		}

		this.setState({ inputStyle: inputStyle });
		this.setState({ buttonStyle: buttonStyle });
	};

	render() {
		let dailyData;
		if (this.state.weeklyWeatherData) {
			const fiveDayData = this.state.weeklyWeatherData.list.filter(
				(d) => d.dt_txt.split(' ')[1] === this.state.weeklyWeatherData.list[0].dt_txt.split(' ')[1]
			);

			dailyData = fiveDayData.map((data, index) => (
				<Day
					date={data.dt_txt.split(' ')[0]}
					key={index}
					temperature={Math.trunc(data.main.temp)}
					iconUrl={data.weather[0].icon}
				/>
			));
		}
		let city, temperature, humidity, clouds, icon, windSpeed, pressure;
		if (this.state.locationWeatherData) {
			city = <p>{this.state.locationWeatherData.name}</p>;
			temperature = <p>{Math.trunc(this.state.locationWeatherData.main.temp)}°C</p>;
			humidity = (
				<div style={{ display: 'flex' }}>
					<img src={'../assets/svg/tint-solid.svg'} alt="icon" />
					<span>{this.state.locationWeatherData.main.humidity}%</span>
				</div>
			);
			clouds = <p>{this.state.locationWeatherData.weather[0].description}</p>;
			icon = <img src={`../assets/svg/${this.state.locationWeatherData.weather[0].icon}.svg`} alt={'alt text'} />;
			windSpeed = (
				<div style={{ display: 'flex' }}>
					<img src={'../assets/svg/wind-solid.svg'} alt="icon" />
					<span>{this.state.locationWeatherData.wind.speed} km/h</span>
				</div>
			);
			pressure = (
				<div style={{ display: 'flex' }}>
					<img src={'../assets/svg/gauge.svg'} alt="icon" />
					<span>{this.state.locationWeatherData.main.pressure} mbar</span>
				</div>
			);
		}

		if (this.state.weatherData) {
			if (this.state.weatherData.count > 0) {
				city = <p>{this.state.weatherData.list[0].name}</p>;
				temperature = <p>{Math.trunc(this.state.weatherData.list[0].main.temp)}°C</p>;
				humidity = <p>{this.state.weatherData.list[0].main.humidity}%</p>;
				clouds = <p>{this.state.weatherData.list[0].weather[0].description}</p>;
				icon = (
					<img src={`../assets/svg/${this.state.weatherData.list[0].weather[0].icon}.svg`} alt={'alt text'} />
				);
			}
		}
		return (
			<div className="App">
				<div className="Wrapper">
					<div className="Left">
						<div className="Icon">{icon}</div>
						<div className="Description">{clouds}</div>
						<div className="City">{city}</div>
						<h1>{temperature}</h1>
						<div className="Search" />
					</div>
					<div className="Right">
						<div className="Humidity">{humidity}</div>
						<div className="Pressure">{pressure}</div>
						<div className="WindSpeed">{windSpeed}</div>
					</div>
				</div>
				<div className="SearchImg">
					<img
						style={{ width: '35px', height: '35px' }}
						onClick={this.addStyle}
						src={'../assets/svg/search.svg'}
						alt="search.svg"
					/>
				</div>

				<div className="SearchInput">
					<input
						style={this.state.inputStyle}
						type="text"
						placeholder="Ime grada"
						onChange={this.handleChange}
					/>
				</div>
				<div className="SearchButton">
					<button style={this.state.buttonStyle} onClick={this.getWeatherData}>
						Search
					</button>
				</div>

				<div className="Daily-Data">{dailyData}</div>
			</div>
		);
	}

	componentWillMount() {
		this.getMyLocationWeather();
	}
}

export default App;
