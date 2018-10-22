/**
 * @author Vimal Maheedharan
 * @copyright Jango
 */
import React from 'react';
import './Cell.css';
import $ from 'jquery'
import { getBoardSize } from '../board/Board'
 
// glyphicon glyphicon-star-empty
export const CROSS_SYMBOL = '<span class="glyphicon glyphicon-ok"></span>'  // Player 1 
export const CIRCLE_SYMBOL = '<span class="glyphicon glyphicon-star-empty"></span>' // Player 2
let lastSelectedSymbol = CIRCLE_SYMBOL 
let drawCountArray = []
drawCountArray[CROSS_SYMBOL] = 0
drawCountArray[CIRCLE_SYMBOL] = 0
let gameComplete = false;
let tableContent 
let specialCombos = []
let NO_OF_CELLS_PER_ROW;

export function resetLastSelectedSymbol() {
	lastSelectedSymbol = CIRCLE_SYMBOL;
}

export function resetGameComplete() {
	gameComplete = false;
	drawCountArray[CROSS_SYMBOL] = 0
	drawCountArray[CIRCLE_SYMBOL] = 0
}

export function setBoardSize() {
	NO_OF_CELLS_PER_ROW = getBoardSize()
}

export default class Cell extends React.Component {
	
	constructor(props) {
		super(props);
		NO_OF_CELLS_PER_ROW = getBoardSize()
	}

	drawSymbol = (event) => {
		if (event.target.innerHTML === "" && gameComplete === false && event.target.tagName.toUpperCase() !== 'SPAN') {
			let symbolToDraw = (lastSelectedSymbol === CIRCLE_SYMBOL) ? CROSS_SYMBOL : CIRCLE_SYMBOL;
			lastSelectedSymbol = event.target.innerHTML = symbolToDraw;
			event.target.className = 'cell after-draw'
			drawCountArray[symbolToDraw]++;
			if (drawCountArray[symbolToDraw] >= NO_OF_CELLS_PER_ROW) {
				this.checkForWin(event.target, lastSelectedSymbol)
			}
		}
	} 

	checkForWin = (cellObject) => {
		let rowIndex = cellObject.parentNode.rowIndex
		let colIndex = cellObject.cellIndex
		tableContent = cellObject.parentNode.parentNode;
		//Check for same row
		for(let i = 0; i < NO_OF_CELLS_PER_ROW; i++) {
			if (this.getCellValueFromIndicies(tableContent, rowIndex, i) !== lastSelectedSymbol) {
				break;
			}
			if (i === NO_OF_CELLS_PER_ROW - 1) {
				this.showWinnerMsg('row', rowIndex)
			}
		}		
		//Check for same col
		for(let i = 0; i < NO_OF_CELLS_PER_ROW; i++) {
			if (this.getCellValueFromIndicies(tableContent, i, colIndex) !== lastSelectedSymbol) {
				break;
			}
			if (i === NO_OF_CELLS_PER_ROW - 1) {
				this.showWinnerMsg('col', colIndex)
			}
		}
		this.setSpecialCombos()
		let self = this
		specialCombos.forEach(function(arr){
			for (let i = 0; i < NO_OF_CELLS_PER_ROW; i++) {
				if (self.getCellValueFromIndicies(tableContent, arr[i][0], arr[i][1]) !== lastSelectedSymbol) {
					break;
				}
				if (i === NO_OF_CELLS_PER_ROW -1) {
					self.showWinningCombo(
						tableContent, 
						arr[i][1] === 0? 'rtl':'ltr' 
					)
					document.getElementById("message").innerHTML = lastSelectedSymbol+ ' wins'
				}
			}
		});
	}

	showWinnerMsg(type, index) {
		this.showWinningCombo(tableContent, type, index)
		document.getElementById("message").innerHTML = lastSelectedSymbol+ ' wins'
	}

	setSpecialCombos = () => {
		let leftDiagonal = []
		let rightDiagonal = []
		let rightDiagonalStartIndex = NO_OF_CELLS_PER_ROW - 1;
		for(let i = 0; i < NO_OF_CELLS_PER_ROW; i++) {
			for(let j = 0; j < NO_OF_CELLS_PER_ROW; j++) {
				if (i === j) {
					leftDiagonal.push([i,j])
				}
			}
			for(let k = rightDiagonalStartIndex--; k >= 0; k--) {
				rightDiagonal.push([i,k])
				break;
			}
		}
		specialCombos = [leftDiagonal, rightDiagonal]
	}

	showWinningCombo = (tableContent, orientation, index=null) => {
		gameComplete = true;
		drawCountArray[CROSS_SYMBOL] = 0
		drawCountArray[CIRCLE_SYMBOL] = 0
		
		if (orientation === 'row') {
			$(tableContent).find('tr').eq(index).find('td').css('background-color', 'lightgreen')
		} else if (orientation === 'col') {
			$(tableContent).find('tr').each(function(value) {
				$(this).find('td').eq(index).css('background-color', 'lightgreen')
			});
		} else if (orientation === 'ltr') {
			let specialComboLtr = specialCombos[0]
			for (let i = 0; i < NO_OF_CELLS_PER_ROW; i ++ ) {
				tableContent.rows[specialComboLtr[i][0]].cells[specialComboLtr[i][1]].style.backgroundColor = 'lightgreen'
			}			
		} else if (orientation === 'rtl') {
			let specialComboRtl = specialCombos[1]
			for (let i = 0; i < NO_OF_CELLS_PER_ROW; i ++ ) {
				tableContent.rows[specialComboRtl[i][0]].cells[specialComboRtl[i][1]].style.backgroundColor = 'lightgreen'
			}			
		} else {
			throw new Error("No winning combos found")
		}
	}

	getCellValueFromIndicies = (tableContent, rowIndex, colIndex) => {
		rowIndex = Math.abs(rowIndex)
		colIndex = Math.abs(colIndex)
		if (rowIndex < NO_OF_CELLS_PER_ROW && colIndex < NO_OF_CELLS_PER_ROW) {
			return tableContent.rows[rowIndex].cells[colIndex].innerHTML;
		} else {
			console.log(rowIndex + ":rowIndex or "+colIndex + ":colIndex is out of bounds") //Don't remove this
		}
		return
	} 

	render() {
		return (
			<td className="cell" onClick={this.drawSymbol}></td>
		);
	}
}
