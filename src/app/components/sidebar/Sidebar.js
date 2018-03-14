import React from 'react';
import { Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import './Sidebar.css';

export class AppSidebar extends React.Component {
	render() {
		console.log(this.props);

		return (
			<Nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
				<ListGroup className="nav nav-pills flex-column w-100">
					<ListGroupItem action>
						<i className="fa fa-dashboard"></i>
						<span className="hidden-sm-down pl-3">Home</span>
						<i className="fa fa-angle-down pull-right arrow-icon"></i>
						<i className="fa fa-angle-right pull-right arrow-icon"></i>
					</ListGroupItem>
					<div>
						<ListGroupItem action>Sub Menu 1</ListGroupItem>
						<ListGroupItem action>Sub Menu 2</ListGroupItem>
					</div>
					<ListGroupItem className="active" action>
						<i className="fa fa-list"></i>
						<span className="hidden-sm-down pl-3">Overview</span>
						<span className="sr-only">(current)</span>
					</ListGroupItem>
					<ListGroupItem action>
						<i className="fa fa-clock-o"></i>
						<span className="hidden-sm-down pl-3">Reports</span>
					</ListGroupItem>
					<ListGroupItem action>
						<i className="fa fa-th"></i>
						<span className="hidden-sm-down pl-3">Analytics</span>
					</ListGroupItem>
					<ListGroupItem action>
						<i className="fa fa-gear"></i>
						<span className="hidden-sm-down pl-3">Export</span>
					</ListGroupItem>
				</ListGroup>
			</Nav>
		);
	}
}

const mapStateToProps = state => {
	return { 'menuItems': state.menuItems };
};

export default connect(mapStateToProps)(AppSidebar);

