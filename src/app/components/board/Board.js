/**
 * @author Vimal Maheedharan
 * @copyright Jango
 */
import React from 'react';
import {
	Table 
} from 'reactstrap';
import './Board.css';
import $ from 'jquery'
import Cell, { resetLastSelectedSymbol, resetGameComplete, setBoardSize }  from '../cell/Cell'

let BOARD_SIZE = 3
const BOARD_SIZE_MULTIPLIER = 70

export function getBoardSize () {
	return BOARD_SIZE;
}

export default class Board extends React.Component {

	componentDidMount = () => {
		this.changeStyle()
	}

	createCells = () => {
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

	changeSize = () => {
		BOARD_SIZE = document.getElementById("board-size").value;
		this.forceUpdate()
		this.redrawTable()
		setBoardSize();
	}

	changeStyle = () => {
		let sideLength = BOARD_SIZE * BOARD_SIZE_MULTIPLIER
		$("table.table").css({
			"width": sideLength,
			"height": sideLength
		})
		$(".table td").css({
			"width": BOARD_SIZE_MULTIPLIER,
			"height": BOARD_SIZE_MULTIPLIER
		})
	}

	componentDidUpdate = () => {
		this.changeStyle()
	}

	redrawTable = () => {
		resetLastSelectedSymbol()
		resetGameComplete()
		$(".cell").html("").removeClass().addClass("cell").attr('style', '')
		this.changeStyle()
		$("#message").html("")
	}
	
	render() {
		return (
			<div className="wrapper">
				<div className="player-info">
					Select Size:
					<select id="board-size" onChange={this.changeSize}>
						<option value="3" defaultValue>3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
					</select>
					{/* <button type="button" class="btn-sm btn-primary" onClick={this.changeSize}>Change Board Size</button> */}
					<button type="button" className="btn btn-link" onClick={this.redrawTable}>Reset</button>
				</div>
				<div id="message"></div>
				<Table className="inner-table" id="play-board">
					<tbody>{this.createCells()}</tbody>
				</Table>
			</div>
		);
	}
}

