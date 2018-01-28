import React from 'react'
import Board from '../Board/Board'
import Player from '../Player/Player'
import GameEngine from '../../Utils/GameEngine.js'
import './game.css'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {game: new GameEngine(200,200,[{location: [36,36], description: {type:'dragon',imgSrc: require('../../resources/images/dragon.gif'), style:{height: '9rem'} }},{location: [6,17], description: {type:'dragon',imgSrc: '../../resources/images/dragon.gif', style:{height: '9rem'} }}],
				[	{location: [12,12], description: {type:'coin', imgSrc: require('../../resources/images/objects/spinning-coin.gif'), interact: {coin: 1, remove: true}}}])
		, player: {id: 1, position: [10,10],name: 'W. Wolff', type: 'human', level: 1, health: 100, magic: 50, equipped: [], experience: {points:0, experiences: []}, coin: 0, stats: [], inventory: []}}
		this.playerBoard = this.updatePlayerBoard([10,10])
		this.playMove = this.playMove.bind(this)
		this.neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
		this.move = this.move.bind(this)
		this.points = 0;
		this.scale = window.innerHeight <= window.innerWidth ? window.innerHeight / 21 : window.innerWidth / 21
	}

	clear(x,y) {	
		this.neighborOffsets.forEach(offset=> {
			if (this.state.game.hasSafeTiles === 0) {
				return
			}
			let fX = offset[0]+x
			let fY = offset[1]+y
			if(fX >= 0 && fY >= 0 && fX < this.state.game.gameBoard.length && fY < this.state.game.gameBoard[0].length) {
				if(this.state.game.gameBoard[fX][fY] === ' ') {
					this.playMove(fX,fY)
					return
				}
			}	
		})
	}


updatePlayerBoard(nextPosition) {
		let center = nextPosition
		let board = this.state.game.gameBoard
		board = board.slice(center[0]-10,center[0]+11)
		let newboard = board.map(row=> row.slice(center[1]-10,center[1]+11))
		
		this.playerBoard=newboard
		return newboard
	}

	playMove(x,y) {
		alert(x+","+y)
	}

	move(keyCode) {	
			let nextPosition = []
			let player = this.state.player
			let animation = false
			nextPosition[0] = this.state.player.position[0]
			nextPosition[1] = this.state.player.position[1]
			switch(keyCode) {
				case 39: 
					if(document.getElementById(`${this.state.player.position[0]},${this.state.player.position[1]+1}`)) {
						nextPosition[0]++
						animation = 'righting'
					}
					break; 
				case 37: 
					if (document.getElementById(`${this.state.player.position[0]},${this.state.player.position[1]-1}`)) {
						nextPosition[0]--
						animation = 'lefting'
					}
					break; 
				case 38: 
					if (document.getElementById(`${this.state.player.position[0]-1},${this.state.player.position[1]}`)) {
						nextPosition[1]--
						animation = 'upping'
					}
					break; 
				case 40: 
					if (document.getElementById(`${this.state.player.position[0]+1},${this.state.player.position[1]}`)) {
						nextPosition[1]++
						animation = 'downing'
					}
					break; 
			}
		if (this.state.game.canPlayerEnter(nextPosition)) {
			this.updatePlayerBoard(nextPosition)
			if (this.state.game.gameBoard[nextPosition[0]][nextPosition[1]]) {
				player = this.state.game.objectInteract(nextPosition,player)
			}

			player.position = nextPosition
			this.setState({player: player})	
			setTimeout(function () {
				//document.getElementById(`${nextPosition[0]},${nextPosition[1]}`).appendChild(document.getElementById('player'))
				document.getElementById('input').focus()
			},1000) 
			return animation
		}
	} 


  componentDidMount() {
		document.getElementById(this.state.player.position[0]+','+this.state.player.position[1]).appendChild(document.getElementById('player'))	
	  document.getElementById('input').focus() 
	}

	render() {
		if (document.getElementById('input')) { document.getElementById('input').focus() }
		return (
			<div id="game" style={{display: 'flex'}}>			
			<p style={{fontSize: "5rem"}}>Ads</p>
				<Player position = {this.state.playerPosition} move={this.move} change={this.state.playerChange}/>
				<Board handleClick={this.playMove} board={this.state.game} player = {this.state.player} startGame={this.startGame} scale={this.scale} playerBoard={this.playerBoard}/>
				<p style={{fontSize: "5rem", color: 'black'}}>Coins {this.state.player.coin}</p>
			</div>
		)
	}
}

export default Game;