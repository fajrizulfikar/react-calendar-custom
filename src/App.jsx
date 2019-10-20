import React from 'react';
import Calendar from './calendar/Calendar.jsx';


export default class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return <Calendar {...this.props} />
    };
}