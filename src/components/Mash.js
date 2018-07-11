import React, { Component } from 'react';
import '../styles/Mash.css';

class Mash extends Component {
  state = {
    finalImage: ''
  }

  componentDidMount () {
    const { imageData } = this.props.mash
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');

    let image1 = new Image();
    image1.onload = () => {
      context.drawImage(image1, 0, 0);
    };
    image1.src = imageData[0];

    let image2 = new Image();
    image2.onload = () => {
      context.drawImage(image2, 0, 400);
    };
    image2.src = imageData[1];

    let image3 = new Image();
    image3.onload = () => {
      context.drawImage(image3, 0, 800);
    };
    image3.src = imageData[2];

    // timeout set to allow for image to be drawn to canvas before invoking toDataURL
    setTimeout(() => {
      this.setState({
        finalImage: canvas.toDataURL()
      })
    }, 10)
  }

  render() {
    const { finalImage } = this.state
    return (
      <div className="mash">
        <canvas ref="canvas" className="gallery-mash" width="800" height="1200" />
        <img className="mash-image" src={finalImage} alt="mash" />
      </div>
    );
  };
};

export default Mash;
