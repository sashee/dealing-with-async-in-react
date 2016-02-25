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
			q.delay(2000).then(() => {
				this.setState({result: `connected to ${selected}`});
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
						This app demonstrates what happens if:
					<ul>
						<li>you have a long running task</li>
						<li>that uses data from the component props</li>
						<li>and modifies the component state</li>
					</ul>
						Change the selected database back and forth and you'll see a notification that a non selected database is connected
					</div>
					<ul>
						<li><a href="PropsErrorCheck.html">For a slightly improved version, click here</a></li>
						<li><a href="PropsErrorTimestamp.html">For a solution, click here</a></li>
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
