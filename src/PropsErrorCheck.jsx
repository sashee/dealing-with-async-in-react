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
				if (this.props.selected === selected) {
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
						By introducing a check to see if the prop has the same value as was when the task started running, we can eliminate the connection to the non-selected database.
						<p>The problem is if you select a database, select the other one then the original one, the connection will take less time.</p>
					</div>
					<ul>
						<li><a href="PropsError.html">For the original problem, click here</a></li>
						<li><a href="PropsErrorTimestamp.html">For a real solution, click here</a></li>
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
