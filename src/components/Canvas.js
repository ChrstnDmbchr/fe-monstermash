import React, { Component } from 'react';
import "../styles/Canvas.css"

// import monsterPart from "../lib/monsterPart"

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

  loadCanvas = (dataUrl) => {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');

    let imageObj = new Image();
    imageObj.onload = () => {
      context.drawImage(imageObj, 0, 0);
    };
    imageObj.src = dataUrl;
  };

  clearCanvas = () => {
    console.log(this.refs.canvas.toDataURL())
    this.refs.canvas.width = this.refs.canvas.width;
    this.refs.canvas.getContext('2d').lineWidth = this.state.radius * 2;
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
    // this.loadCanvas(dataURL);
  };

  render() {
    return (
      <div className="canvas">
        <canvas ref="canvas" className="canvas-area" width="800" height="400" onMouseDown={this.engage} onMouseUp={this.disengage}><strong>Your browser does not cupport canvas</strong></canvas>
        <div>
          <label htmlFor="rad">Set line width: </label>
          <input type="number" ref="rad" name="rad" defaultValue={this.state.radius} min="1" max="10" onChange={this.setRadius}/>
        </div>
        <div>
          <label htmlFor="colorSelect">Select your color: </label>
          <input ref="colorSelect" name="colorSelect" type="color" onChange={this.setColor}/>
        </div>
        <button onClick={this.clearCanvas}>Clear</button>
      </div>
    );
  };
};


export default Canvas;
