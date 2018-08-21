import React, { Component } from 'react';
import NavBar from './components/nav_bar';
import UserLanding from "./components/user_landing";
import {init as firebaseInit} from './firebase/firebase';
import FeaturedAppointments from "./components/featured_appointments/feat_appts";

class App extends Component {
	constructor() {
		super();
		firebaseInit();
		this .state = {
			email: "",
			password: "",
			currentUser: ""
		};
	}

	render() {
		return (
			<div className="App">
				<NavBar/>
				{/* <UserLanding/> */}
				<FeaturedAppointments />
			</div>
		);
	}
}

export default App;
