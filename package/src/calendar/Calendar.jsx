import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as dateFns from 'date-fns';

import './Calendar.css';

import CalendarHeader from './CalendarHeader/CalendarHeader.jsx';
import CalendarDays from './CalendarDays/CalendarDays.jsx';
import CalendarDate from './CalendarDate/CalendarDate.jsx';

import '../styles/grid.css';

const defaultFormatDate = 'yyyy-MM-dd';

const Calendar = props => {
	const {
		onDateClick,
		events,
		height,
		width,
		value,
		markerColor,
		selectedDateStyle,
		todayStyle,
	} = props;

	/**
	 * Conditional initialDate to make possible pass
	 * string as `selectedDate` without warn from `date-fns`.
	 */
	const initialSelectedDate =
		typeof value === 'string'
			? dateFns.parse(value, defaultFormatDate, new Date())
			: value;

	const [selectedDate, setSelectedDate] = useState(initialSelectedDate);

	const handleDateClick = (date, info = null) => {
		setSelectedDate(date);
		if (onDateClick) {
			onDateClick(info);
		}
	};

	const [currentViewDate, setCurrentViewDate] = useState(new Date());

	const handleNextMonthClick = () => {
		setCurrentViewDate(dateFns.addMonths(currentViewDate, 1));
	};

	const handlePrevMonthClick = () => {
		setCurrentViewDate(dateFns.subMonths(currentViewDate, 1));
	};

	return (
		<div id="calendarContainer" style={{ height, width }}>
			<CalendarHeader
				date={currentViewDate}
				onNextMonthClick={handleNextMonthClick}
				onPrevMonthClick={handlePrevMonthClick}
			/>
			<CalendarDays firstDay={currentViewDate} />
			<CalendarDate
				events={events}
				currentViewDate={currentViewDate}
				selectedDate={selectedDate}
				onDateClick={handleDateClick}
				markerColor={markerColor}
				selectedDateStyle={selectedDateStyle}
				todayStyle={todayStyle}
			/>
		</div>
	);
};

export default Calendar;

Calendar.defaultProps = {
	value: new Date(),
};

Calendar.propTypes = {
	onDateClick: PropTypes.func,
	events: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	markerColor: PropTypes.string,
	selectedDateStyle: PropTypes.object,
	todayStyle: PropTypes.object,
};
