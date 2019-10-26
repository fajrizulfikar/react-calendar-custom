import React from 'react';
import { addDays, format } from 'date-fns'
import Calendar from 'react-calendar-custom';

const sampleEvents = [
	{
		title: 'Refactor',
		date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
	},
	{
		title: 'Sprint Review',
		date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
	}
]

function App() {
	console.log(sampleEvents)
	return (
		<div className="App">
			<Calendar
				value="2019-10-26"
				events={sampleEvents}
			/>
		</div>
	);
}

export default App;
