"use strict";

import React from "react";
import ReactDOM from "react-dom";
import q from "q";

const Navigation = React.createClass({
	getInitialState() {
		return {
			active: 0
		}
	},
	render() {
		return (
			<div>
				<h3>Usage</h3>
				<div>
					This app demonstrates what happens if:
				<ul>
					<li>you have a long running task</li>
					<li>that modifies the component state</li>
				</ul>
					Click "Start task" then click "Another page" within 2 seconds. You'll see a React warning on the developer console
				</div>
				<br/>
				<a href="BasicErrorSolution.html">For a solution, click here</a>
				<h3>Navigation</h3>
				<div>
					<button onClick={() => {this.setState({active: 0});}}>Main page</button>
					<button onClick={() => {this.setState({active: 1});}}>Another page</button>
				</div>
				<h3>Page</h3>
				<div>
					{this.state.active === 0 &&
						<Component/>
					}
					{this.state.active === 1 &&
						<div>This is another page</div>
					}
				</div>
			</div>
			);
	}
});

const Component = React.createClass({
	getInitialState() {
		return {
			result: "not started"
		};
	},
	handleClick() {
		this.setState({result: "started"});
		q.delay(2000).then(() => {
			this.setState({result: "finished"});
		}).done();
	},
	render() {
		return (
			<div>
				<button onClick={this.handleClick}>Start task</button>
				<div>
					The current state is: {this.state.result}
				</div>
			</div>
		);
	}
});

window.addEventListener("load", () => {
	const container = document.createElement("div");
	document.body.appendChild(container);
	ReactDOM.render(<Navigation/>, container);
});
