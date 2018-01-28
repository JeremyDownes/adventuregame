import React from 'react'
import '../../reset.css'
import './square.css'



class Square extends React.Component {
	constructor(props) {
		super(props)
		this.position = this.props.position;																															// a 2d array like [0,0] generated by the Board components render loop 
		this.handleClick = this.handleClick.bind(this)
		this.style = {height: this.props.scale+'px', width: this.props.scale+'px', maxHeight: this.props.scale+'px', maxWidth: this.props.scale+'px'}
	}

	handleClick(e) {
		this.props.handleClick(this.props.position[0],this.props.position[1])													// this passes the Game component's playMove method the value of the caller which mutates this.props.playerBoard
	}

	getObject() {
		if(this.props.playerBoard[this.position[0]][this.position[1]]) {
			let object = this.props.playerBoard[this.position[0]][this.position[1]].object


			if (object) {
				return <img src={object.description.imgSrc} className={object.description.type}/>
			} 
		}
	}

getObstacle() {

		if (this.props.playerBoard[this.position[0]][this.position[1]]) {
			let obstacle = this.props.playerBoard[this.position[0]][this.position[1]].obstacle

			if (obstacle) {
				if (obstacle.description) {
					return <img src={obstacle.description.imgSrc} style={obstacle.description.style }/>
				}
			} 
		}
	}
	render() {

		return (
		  <div className='square' 
		  	onClick={this.handleClick} 
				onDragOver={this.allowDrop}
				onDrop={this.drop}
				style={this.style}
				id = {this.props.position}
			>
			{this.getObject()}
			{this.getObstacle()}
		  </div>
		)
	}
}

export default Square