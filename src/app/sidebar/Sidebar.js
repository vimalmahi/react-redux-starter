import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './Sidebar.css';

export default class AppSidebar extends React.Component {
	render() {
		return (
			<Nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
				<ul className="nav nav-pills flex-column w-100">
					<NavItem>
						<NavLink>Link</NavLink>
					</NavItem>
					<NavItem>
						<NavLink className="active">Overview <span className="sr-only">(current)</span></NavLink>
					</NavItem>
					<NavItem >
						<NavLink>Reports</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>Analytics</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>Export</NavLink>
					</NavItem>
				</ul>

				<ul className="nav nav-pills flex-column w-100">
					<NavItem>
						<NavLink>Nav item</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>Nav item again</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>One more nav</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>Another nav item</NavLink>
					</NavItem>
				</ul>

				<ul className="nav nav-pills flex-column w-100">
					<NavItem>
						<NavLink>Nav item again</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>One more nav</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>Another nav item</NavLink>
					</NavItem>
				</ul>
			</Nav>
		);
	}
}