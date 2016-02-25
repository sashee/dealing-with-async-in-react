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
					By introducing an isMounted() guard, we can get rid of the error.
				</div>
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
			if (this.isMounted()) {
				this.setState({result: "finished"});
			}
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
