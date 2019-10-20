import React from 'react';
import PropTypes from 'prop-types';
import * as dateFns from 'date-fns';

import './CalendarDays.css';

const DAY_COL_COUNT = 7;

const CalendarDays = props => {
	const { firstDay } = props;

	const getDaysOfWeek = () => {
		const dateFormat = 'E';
		const startDay = dateFns.startOfWeek(firstDay);

		let days = [];

		for (let i = 0; i < DAY_COL_COUNT; i++) {
			days.push(dateFns.format(dateFns.addDays(startDay, i), dateFormat));
		}

		return days;
	};

	return (
		<section id="calendarDays" className="row row-center">
			{getDaysOfWeek().map(day => (
				<div key={day} className="column day-column">
					<span className="day-label">{day}</span>
				</div>
			))}
		</section>
	);
};

export default CalendarDays;

CalendarDays.propTypes = {
	firstDay: PropTypes.instanceOf(Date),
}