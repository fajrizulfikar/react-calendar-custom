import React from 'react';
import PropTypes from 'prop-types';
import * as dateFns from 'date-fns';

import './CalendarDate.css';

const displayDateFormat = 'd';
const dataDateFormat = 'yyyy-MM-dd';

const CalendarDate = props => {
	const {
		currentViewDate,
		selectedDate,
		onDateClick,
		events,
		customMarkerComponent,
		markerColor,
		selectedDateStyle,
		todayStyle,
	} = props;

	const monthStart = dateFns.startOfMonth(currentViewDate);
	const monthEnd = dateFns.endOfMonth(monthStart);
	const startDate = dateFns.startOfWeek(monthStart);
	const endDate = dateFns.endOfWeek(monthEnd);

	const hasEvent = date => {
		if (typeof date === 'object') {
			date = dateFns.format(date, dataDateFormat);
		}
		for (let event of events) {
			if (date === event.date) {
				return true;
			}
		}

		return false;
	};

	const getCellDateStyle = date => {
		let clsNames = ['column', 'date-cell'];
		let customStyle = {
			selected: {},
			today: {},
		};

		if (dateFns.isToday(date, new Date())) {
			clsNames.push('today');
			customStyle.selected = selectedDateStyle;
		}

		if (dateFns.isSameDay(date, selectedDate)) {
			clsNames.push('selected');
			customStyle.today = todayStyle;
		}

		if (!dateFns.isSameMonth(date, currentViewDate)) {
			clsNames.push('other-month');
		}

		return [String(clsNames.join(' ')), customStyle];
	};

	const getDateInfo = date => {
		let info = {
			date,
		};
		if (hasEvent(date)) {
			info.hasEvent = true;
		} else {
			info.hasEvent = false;
		}

		return info;
	};

	const EventComponent = props => {
		if (customMarkerComponent !== undefined && customMarkerComponent !== null) {
			return customMarkerComponent;
		} else {
			return (
				<div
					className="event-marker"
					style={{ backgroundColor: markerColor }}
				></div>
			);
		}
	};

	const renderDateCells = () => {
		/**
		 * Variable to holds dates per row.
		 */
		let rows = [];

		/**
		 * This variable would create a row to hold 7 dates.
		 */
		let dates = [];
		let date = startDate;
		let displayDate;
		let dataDate;

		while (date <= endDate) {
			for (let i = 0; i < 7; i++) {
				displayDate = dateFns.format(date, displayDateFormat);
				dataDate = dateFns.format(date, dataDateFormat);
				const [dateClsname, customDateStyle] = getCellDateStyle(date);
				const argDay = date;
				const info = getDateInfo(dataDate);

				dates.push(
					<td
						className={dateClsname}
						data-date={dataDate}
						key={date}
						onClick={() => onDateClick(argDay, info)}
					>
						<div className="date-background">
							{hasEvent(dataDate) && <EventComponent />}
							<span
								className="date-number"
								style={{
									...customDateStyle.today,
									...customDateStyle.selected,
								}}
							>
								{displayDate}
							</span>
						</div>
					</td>
				);
				date = dateFns.addDays(date, 1);
			}
			/**
			 * Push one row to rows.
			 */
			rows.push(
				<tr className="row" key={date}>
					{dates}
				</tr>
			);

			/**
			 * Empty row before create a new row.
			 */
			dates = [];
		}
		return rows;
	};

	return (
		<section id="calendarCells">
			<table id="dateCellsContainer">
				<tbody>{renderDateCells()}</tbody>
			</table>
		</section>
	);
};

export default CalendarDate;

CalendarDate.propTypes = {
	currentViewDate: PropTypes.instanceOf(Date),
	selectedDate: PropTypes.instanceOf(Date),
	onDateClick: PropTypes.func.isRequired,
	events: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	customMarkerComponent: PropTypes.instanceOf(React.Component),
	markerColor: PropTypes.string,
	selectedDateStyle: PropTypes.object,
	todayStyle: PropTypes.object,
};
