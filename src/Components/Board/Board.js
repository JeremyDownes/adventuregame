import React from 'react'
import Square from '../Square/Square'
import '../../reset.css'
import './board.css'

class Board extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)

	}

	handleClick(x,y) {
		this.props.handleClick(x,y);																									  // passes the event from a square to the game
	}

	render() {

		let style = {}
		if(this.props.playerBoard) {
		style = {		
			backgroundSize: '1000%',
			backgroundPosition: (this.props.player.position[0]-10)/1.9+'% '+(this.props.player.position[1]-10)/1.3+'%',																																//  Dynamic style
		  gridTemplateColumns: '1fr '.repeat(21),		//  Adding another fraction of screen for every item column in our playerBoard array	
 		  gridTemplateRows: '1fr '.repeat(21)					//  Doing the same for every row
		}
		}

		let iRow = this.props.player.position[1] - 11			
		let offset = this.props.player.position[0] - 10																															// I itterate first thing and it's index values so itterators to -1
		let iColumn = this.props.player.position[0] - 11																														

		return (
			<div className='board' style={style}>															
				{
					this.props.playerBoard.map(row=> {																	
						iRow++;																																	
						return row.map(square=> {																								
							iColumn++;				
							if (iColumn%(21+offset)===0) {iColumn = offset}
							return <Square playerBoard={this.props.playerBoard} board={this.props.board} position={[iColumn,iRow]} handleClick={this.handleClick} scale={this.props.scale}/> ;  //we render a square with a reference to the game board it's position and a reference to an event handler
						})																																																				
					})
				}
			</div>
		)
	}
}

export default Board;
/*
		return (
			<div className='board' style={style}>																				  // applies our dynamic style dividing our veiwport grid up like we want

				{
					this.props.board.playerBoard.map(row=> {																	// Start the loop for each row
						iRow++;																																	// itterate up to (0,-1)
						return row.map(square=> {																								// Start the loop for each column within the row
							iColumn++;																														// itterate up to (0,0)
							iColumn=iColumn%this.props.board.playerBoard[0].length;								// mod by length sets our count back to 0 when it hits the length	
							return <Square board={this.props.board} position={[iRow,iColumn]} handleClick={this.handleClick} /> ;  //we render a square with a reference to the game board it's position and a reference to an event handler
						})																																																				
					})											// the squares render nicely into a grid based on the array dimensions
				}
			</div>
		);
	*/