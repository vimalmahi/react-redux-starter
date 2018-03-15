import React from 'react';
import { Nav, ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { toggleMenuItem } from '../../../actions/index';
import './Sidebar.css';

export class AppSidebar extends React.Component {
	openMenu(item) {
		this.props.toggleMenuItem(item);
	}

	render() {
		return (
			<Nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
				<ListGroup className="nav nav-pills flex-column w-100">
					{
						this.props.menuItems.map((item, index) => {
							return <div key={index}>
								<ListGroupItem action onClick={() => this.openMenu(item)}>
									<i className={'fa fa-' + item.icon}></i>
									<span className="hidden-sm-down pl-3">{item.name}</span>
									{
										item.children &&
										<span>
											{item.active && <i className="fa fa-angle-down pull-right arrow-icon"></i>}
											{!item.active && <i className="fa fa-angle-right pull-right arrow-icon"></i>}
										</span>
									}

								</ListGroupItem>
								{
									item.active && <div>
										{
											item.children && item.children.map((subitem, i) => {
												return <ListGroupItem key={i} action>{subitem.name}</ListGroupItem>;
											})
										}
									</div>
								}
							</div>;
						})
					}
				</ListGroup>
			</Nav>
		);
	}
}

const mapStateToProps = state => {
	return { 'menuItems': state.menuItems };
};

const mapDispatchToProps = dispatch => {
	return {
		'toggleMenuItem': item => dispatch(toggleMenuItem(item))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);

