import React, { Component } from 'react';
import "../styles/Canvas.css"

import monsterPart from "../lib/monsterPart"

class Canvas extends Component {
  state = {
    radius: 1,
    dragging: false,
    color: "black",
    token: localStorage.getItem('monstermash-id'),
  };

  setRadius = (e) => {
    e.preventDefault();
    this.setState({
      radius: Number(this.refs.rad.value),
    }, () => {
      this.refs.canvas.getContext('2d').lineWidth = this.state.radius * 2;
    });
  };

  setColor = (e) => {
    this.setState({
      color: this.refs.colorSelect.value
    });
  };

  draw = (e) => {
    const canvas = this.refs.canvas;
    let context = canvas.getContext('2d');

    if (this.state.dragging) {
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = this.state.color;
      context.fillStyle = this.state.color;
      context.stroke();
      context.beginPath();
      context.arc(e.offsetX, e.offsetY, this.state.radius, 0, Math.PI*2);
      context.fill();
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
    };
  };

  engage = (e) => {
    this.setState({
      dragging: true
    }, () => {
      this.draw(e);
    });
  };
  
  disengage = () => {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');

    this.setState({
      dragging: false
    }, () => {
      context.beginPath();
    });
  };

  loadCanvas = () => {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');

    let image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0);
    };
    image.src = monsterPart.head;
  };

  clearCanvas = () => {
    this.refs.canvas.width = this.refs.canvas.width;
    this.refs.canvas.getContext('2d').lineWidth = this.state.radius * 2;
    this.loadCanvas(monsterPart.head)
  };

  componentDidMount () {
    if (!this.state.token) {
      this.props.history.push('/login')
    };
    
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');

    // sets the lines in between the draw points to the width of the cirlce.
    context.lineWidth = this.state.radius * 2;

    canvas.addEventListener('mousemove', this.draw); 

    // invoke function with the dataURL from db to load canvas with placeholder
    this.loadCanvas(monsterPart.head);
  };

  render() {
    const { currMash } = this.state
    return (
      <div className="canvas">
        <div className="canvas-title">
          <h1 className="title">Time to start a new Monster Mash!</h1>
          <h1 className="subtitle">you are drawing the {!currMash ? 'head!' : currMash + '!'}</h1>
          <h1 className="subtitle">connect your body part to the marker on the canvas to all the part line up!</h1>
        </div>
        <canvas ref="canvas" className="canvas-area" width="800" height="400" onMouseDown={this.engage} onMouseUp={this.disengage}><strong>Your browser does not cupport canvas</strong></canvas>
        <div className="canvas-input">
          <div>
            <label className="subtitle" htmlFor="rad">Set line width: </label>
            <input className="canvas-rad input is-rounded" type="number" ref="rad" name="rad" defaultValue={this.state.radius} min="1" max="10" onChange={this.setRadius}/>
          </div>
          <div>
            <label className="subtitle" htmlFor="colorSelect">Select your color: </label>
            <input className="canvas-rad input is-rounded" ref="colorSelect" name="colorSelect" type="color" onChange={this.setColor}/>
          </div>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button onClick={this.userSignUp} className="button nav-button">Submit Mash!</button>
          </div>
          <div className="control">
            <button className="button" onClick={this.clearCanvas}>Clear Canvas</button>
          </div>
        </div>
        
      </div>
    );
  };
};


export default Canvas;
