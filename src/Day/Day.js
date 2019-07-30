import React, { Component } from 'react';

import classes from './Day.module.scss';

class Day extends Component {

	constructor(props){
		super(props)
		// this.getDate = this.getDate.bind(this);
		this.state = {
			date: null,
		}
	}

	componentWillMount() {
		let date = new Date (this.props.date);	
		let dateDay = date.getDay()		
			if(dateDay === 0){
				this.setState({date: 'Monday'})
			}
			else if(dateDay === 1){
				this.setState({date: 'Tuesday'})
			}
			else if(dateDay === 2){
				this.setState({date: 'Wednesday'})
			}
			else if(dateDay === 3){
				this.setState({date: 'Thursday'})
			}
			else if(dateDay === 4){
				this.setState({date: 'Friday'})
			}
			else if(dateDay === 5){
				this.setState({date: 'Saturday'})
			}
			else if(dateDay === 6){
				this.setState({date: 'Sunday'})
			}
		}	
	

	render() {
		return(
			<div className={classes.Day}>
			<div>{this.props.temperature}°C</div>
			<div>{this.state.date}</div>
			<div>
				<img src={this.props.iconUrl} alt={this.props.icon} />
			</div>
		</div>
		);
	}
}
export default Day;
