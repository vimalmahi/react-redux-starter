import React from 'react';
import {
	Table, Button
} from 'reactstrap';
import './Board.css';
import $ from 'jquery'
import Cell, { resetLastSelectedSymbol, resetGameComplete, CROSS_SYMBOL, CIRCLE_SYMBOL }  from '../cell/Cell'

let BOARD_SIZE = 3

export function getBoardSize () {
	return BOARD_SIZE;
}

export default class Board extends React.Component {
	
	createCells = () => {
		console.log(BOARD_SIZE)
		let rows = []
		for(let i = 0; i < BOARD_SIZE; i++) {
			let cols = []
			for(let j = 0; j < BOARD_SIZE; j++) {
				let colKey = 'col_'+j
				cols.push(<Cell key={colKey}>HELLO</Cell>)				
			}
			let rowKey = 'row_'+i
			rows.push(<tr key={rowKey}>{cols}</tr>)
		}
		return rows
	}

	changeSize = (event) => {
		BOARD_SIZE = event.target.value;
		this.forceUpdate()
		this.redrawTable()
	}
	
	redrawTable = () => {
		resetLastSelectedSymbol()
		resetGameComplete()
		$(".cell").html("").removeClass().addClass("cell").attr('style', '')
		$("#message").html("New game started")
	}
	
	render() {
		return (
			<div>
				<div className="player-info">
				
					Player 1: {CROSS_SYMBOL}, Player 2: {CIRCLE_SYMBOL} <br/>
					Select Size: 
					<select onChange={this.changeSize}>
						<option value="2">2</option>
						<option value="3" selected>3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
					</select>
					<Button onClick={this.redrawTable}>Start again</Button>
				</div>
				<div id="message"></div>
				<Table className="inner-table" id="play-board">
					<tbody>{this.createCells()}</tbody>
				</Table>
				
			</div>
		);
	}
}
