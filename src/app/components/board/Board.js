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
import queryString from 'query-string'
import Cell, { resetLastSelectedSymbol, resetGameComplete, setBoardSize }  from '../cell/Cell'

let BOARD_SIZE;
const BOARD_SIZE_MULTIPLIER = 70

export function getBoardSize () {
	return BOARD_SIZE;
}

export default class Board extends React.Component {

	componentDidMount = () => {
		this.changeStyle()
		if (this.props.match.params.size !== 'undefined') {
			$('#board-size').val(BOARD_SIZE)
		}
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
		this.props.history.push('/size/'+BOARD_SIZE);
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

	componentWillMount = () => {
		if (
			isNaN(this.props.match.params.size) || 
			this.props.match.params.size > 9 || 
			this.props.match.params.size < 3
			) {
			this.props.match.params.size = 3 //Defaults to minimum size
			this.props.history.push('/size/3');
		}
	}

	redrawTable = () => {
		resetLastSelectedSymbol()
		resetGameComplete()
		$(".cell").html("").removeClass().addClass("cell").attr('style', '')
		this.changeStyle()
		$("#message").html("")
	}
	
	render() {
		BOARD_SIZE = (this.props.match.params.size === 'undefined') ? 3 : this.props.match.params.size;
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

