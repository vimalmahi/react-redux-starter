import React from 'react';
import {
	Table
} from 'reactstrap';
import './Board.css';

import Cell from '../cell/Cell'

export default class Board extends React.Component {
	createCells = () => {
		let rows = []
		for(let i = 0; i < 3; i++) {
			let cols = []
			for(let j = 0; j < 3; j++) {
				cols.push(<Cell>HELLO</Cell>)				
			}
			rows.push(<tr>{cols}</tr>)
		}
		return rows
	}
	render() {
		return (
			<div>
				<Table className="inner-table">
					{this.createCells()}
				</Table>
			</div>
		);
	}
}
