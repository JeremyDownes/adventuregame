export class GameEngine {
	constructor(numberOfRows,numberOfColumns,obstacles,objects){
		this._obstacles = obstacles;	// [{location: [2,3], type: 'fire', changeable: true, doesDamage: true},{location: [20,16], type: 'wall', changeable: false, doesDamage: false}]
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._gameBoard = GameEngine.generateGameBoard(numberOfRows,numberOfColumns,obstacles,objects)
	}

	get gameBoard() {
		return this._gameBoard
	}


	objectInteract(objXY,player) {
		alert()
		let obj = this.gameBoard[objXY[0]][objXY[1]].object
		let interact = obj.description.interact
		let key =Object.keys(interact)[0]
		if(typeof(interact[key])==='number') {
			player[key] += interact[key]
		}
		if(interact.remove) {
			this.gameBoard[objXY[0]][objXY[1]] = null
		}
		return player
	}

	canPlayerEnter(position) {
		let x = position[0]
		let y = position[1]
		if(this.gameBoard[x][y]){
		if(this.gameBoard[x][y].obstacle) {
			return false
		} else {
			return true
		}
		}
		else {
			return true
		}
	}

	static generateGameBoard(numberOfRows,numberOfColumns,obstacles,objects) {
		let board = []
		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			let row = []
			for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
				row.push(null)
			}
			board.push(row)
		}
		return GameEngine.generateObstacleBoard(board,obstacles,objects) 
	}

	static generateObstacleBoard (board,obstacles,objects) {
		obstacles.forEach(obstacle=> {
			let x = obstacle.location[0]
			let y = obstacle.location[1]
			board[x][y] = {obstacle: obstacle} 
		})
	  return GameEngine.generateObjectBoard(board,obstacles,objects)
	}	

	static generateObjectBoard (board,obstacles,objects) {
		objects.forEach(object=> {
			let x = object.location[0]
			let y = object.location[1]
			board[x][y] = {object: object}
		})
	  return board
	}	
}

export default GameEngine

/*  getNumberOfNeighborBombs(rowIndex,columnIndex) {
		const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
		const numberOfRows = this._bombBoard.length
		const numberOfColumns = this._bombBoard[0].length
		let numberOfBombs = 0
		neighborOffsets.forEach(offset => {
			const neighborRowIndex = rowIndex + offset[0]
			const neighborColumnIndex = columnIndex + offset[1]
			if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
				if (this._bombBoard[neighborRowIndex][neighborColumnIndex]==="B") {
					numberOfBombs++
				}
			}
		})
		return numberOfBombs
	}
*/