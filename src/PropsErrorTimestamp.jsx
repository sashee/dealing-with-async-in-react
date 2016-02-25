"use strict";

import React from "react";
import ReactDOM from "react-dom";
import q from "q";

const DatabaseConnection = React.createClass({
	getInitialState() {
		return {
			result: "not connected"
		};
	},
	connect(selected) {
			this.setState({result: `connecting to ${selected}`});
			const timestamp = new Date().getTime();
			this.setState({timestamp});
			q.delay(2000).then(() => {
				if (this.state.timestamp === timestamp) {
					this.setState({result: `connected to ${selected}`});
				}
			}).done();
	},
	componentDidMount() {
		this.connect(this.props.selected);
	},
	componentDidUpdate(prevProps) {
		if (prevProps.selected !== this.props.selected) {
			this.connect(this.props.selected);
		}
	},
	render() {
		return (
			<div>
				{this.state.result}
			</div>
		);
	}
});

const Component = React.createClass({
	getInitialState() {
		return {
			selected: "Database A"
		};
	},
	componentDidUpdate(prevProps, prevState) {
		if (prevState.selected !== this.state.selected) {
			const selected = this.state.selected;
			this.setState({result: `connecting to ${selected}`});
			q.delay(2000).then(() => {
				this.setState({result: `connected to ${selected}`});
			}).done();
		}
	},
	render() {
		return (
			<div>
				<div>
					<h3>Usage</h3>
					<div>
						By introducing a timestamp that keeps track of the last modified time, we can mitigate the problem
					</div>
					<ul>
						<li><a href="PropsError.html">For the original problem, click here</a></li>
						<li><a href="PropsErrorCheck.html">For a slightly improved version, click here</a></li>
						<li><a href="PropHack.html">For a hack to circumvent this, click here</a></li>
					</ul>
				</div>
				<select
					onChange={(evt) => {this.setState({selected: evt.currentTarget.value});}}
					value={this.state.selected}
				>
					<option>Database A</option>
					<option>Database B</option>
				</select>

				<div>
					<DatabaseConnection selected={this.state.selected}/>
				</div>
			</div>
		);
	}
});

window.addEventListener("load", () => {
	const container = document.createElement("div");
	document.body.appendChild(container);
	ReactDOM.render(<Component/>, container);
});
