import React from 'react';
import {
	Table
} from 'reactstrap';
import './Cell.css';
import $ from 'jquery'


const CROSS_SYMBOL = 'X'  // Player 1 
const CIRCLE_SYMBOL = 'O' // Player 2
const NO_OF_CELLS_PER_ROW = 3; 
let lastSelectedSymbol = CIRCLE_SYMBOL 
let drawCountArray = []
drawCountArray[CROSS_SYMBOL] = 0;
drawCountArray[CIRCLE_SYMBOL] = 0;

export default class Cell extends React.Component {
	
	drawSymbol = (event) => {
		if (event.target.innerHTML == "") {
			let symbolToDraw = (lastSelectedSymbol == CIRCLE_SYMBOL) ? CROSS_SYMBOL : CIRCLE_SYMBOL;
			lastSelectedSymbol = event.target.innerHTML = symbolToDraw;
			event.target.className = 'cell after-draw'

			drawCountArray[symbolToDraw]++;
			if (drawCountArray[symbolToDraw] >= NO_OF_CELLS_PER_ROW) {
				this.checkForWin(event.target, lastSelectedSymbol)
			}
		}
	} 
	
	checkForWin = (cellObject, lastSelectedSymbol) => {
		let rowIndex = cellObject.parentNode.rowIndex
		let colIndex = cellObject.cellIndex
		let tableContent = cellObject.parentNode.parentNode;
		//Check for same row
		for(let i = 0; i < 3; i++) {
			if (this.getCellValueFromIndicies(tableContent, rowIndex, i) != lastSelectedSymbol) {
				break;
			}
			if (i == 2) {
				this.showWinningCombos(tableContent, 'row', rowIndex)
			}
		}		
		//Check for same col
		for(let i = 0; i < 3; i++) {
			if (this.getCellValueFromIndicies(tableContent, i, colIndex) != lastSelectedSymbol) {
				break;
			}
			if (i == 2) {
				this.showWinningCombos(tableContent, 'col', colIndex)
			}
		}
	}

	showWinningCombos = (tableContent, orientation, index) => {
		if (orientation == 'row') {
			$(tableContent).find('tr').eq(index).find('td').css('background-color', 'lightgreen')
			$(tableContent).find('td').each(function(){
				window.removeEventListener('click', this.onClick, false)
			});
		} else if (orientation == 'col') {
			$(tableContent).find('tr').each(function(value) {
				$(this).find('td').eq(index).css('background-color', 'lightgreen')
				$(this).find('td').removeEventListener('click', this.onClick)
			});
		} else {
			alert("Some error")
		}
	}


	getCellValueFromIndicies = (tableContent, rowIndex, colIndex) => {
		rowIndex = Math.abs(rowIndex)
		colIndex = Math.abs(colIndex)
		if (rowIndex < NO_OF_CELLS_PER_ROW && colIndex < NO_OF_CELLS_PER_ROW) {
			return tableContent.rows[rowIndex].cells[colIndex].innerHTML;
		} else {
			console.log(rowIndex + ":rowIndex or "+colIndex + ":colIndex is out of bounds")
		}
		return
	} 

	render() {
		return (
			<td className="cell" onClick={this.drawSymbol}></td>
		);
	}
}
