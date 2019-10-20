import React from 'react';
import PropTypes from 'prop-types';
import * as dateFns from 'date-fns';

import '../../styles/icons.css';
import '../../styles/grid.css';
import './CalendarHeader.css';

const CalendarHeader = props => {
	const dateFormat = 'MMMM yyyy';

	const { date, onPrevMonthClick, onNextMonthClick } = props;

	return (
		<section id="calendarHeader" className="row row-center">
			<div className="column col-start">
				<button className="change-month-btn" onClick={onPrevMonthClick}>
					<div className="material-icon">chevron_left</div>
				</button>
			</div>
			<div className="column col-center">
				<span>{dateFns.format(date, dateFormat)}</span>
			</div>
			<div className="column col-start">
				<button className="change-month-btn" onClick={onNextMonthClick}>
					<div className="material-icon">chevron_right</div>
				</button>
			</div>
		</section>
	);
};

export default CalendarHeader;

CalendarHeader.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	onPrevMonthClick: PropTypes.func.isRequired,
	onNextMonthClick: PropTypes.func.isRequired,
};