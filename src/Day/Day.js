import React from 'react';

import classes from './Day.module.scss';

const Day = (props) => (
	<div className={classes.Day}>
		<div>{props.temperature}°C</div>
        <div>{props.date}</div>
		<div>
			<img src={props.iconUrl} alt={props.icon} />
		</div>
	</div>
);

export default Day;
