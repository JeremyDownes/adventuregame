import React from 'react'
import '../../reset.css'
import './Player.css'

class Player extends React.Component {
	constructor(props) {
		super(props)
		this.state = {currentAnimation: 'stand', animation: {stand: require('../../resources/images/animations/some_pissed_off_little_guy_by_rongs1234.png'), walk: require('../../resources/images/animations/step.gif'), left: require('../../resources/images/animations/left.gif')}}
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.class = ''
	}

	handleKeyPress(e) {
		let animation = this.props.move(e.keyCode)
		if(animation) {
			this.setState({currentAnimation: 'walk'})
			setTimeout(function() {
				this.setState({currentAnimation: 'stand'})
			}.bind(this),1000)
	
		}
	}

	render() {
		return (
			<div id='player' className={this.class}>
				<img src={this.state.animation[this.state.currentAnimation]}/>
				<input id='input' type='text' value={this.props.position} onKeyUp={this.handleKeyPress} autoFocus='true'></input>
			</div>
		)
	}
}

export default Player