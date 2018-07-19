import React, { Component } from 'react';
import '../styles/Mash.css';

class Mash extends Component {
  state = {
    finalImage: '',
    isModalActive: false,
  }

  toggleModal = () => {
    this.setState({
      isModalActive: !this.state.isModalActive
    });
  };

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
    }, 100)
  }

  render() {
    const { finalImage, isModalActive } = this.state
    return (
      <div>
        <div className="mash animated flipInY">
          <canvas ref="canvas" className="mash-canvas" width="800" height="1200" />
          {!finalImage ? <h1 className="mash-loading">Loading Monster Mash!</h1> : <img className="mash-image" onClick={this.toggleModal} src={finalImage} alt="mash" />}
        </div>

        <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={this.toggleModal}></div>
          <div className="modal-content">
             <div className="box">
                <img src={finalImage} className="mash-full" alt="mash" download/>
                <br />
                <a href={finalImage} download>Download <i class="fa fa-download" aria-hidden="true"></i></a>
             </div>
          </div>
          <button className="modal-close is-large" onClick={this.toggleModal} aria-label="close"></button>
        </div>
      </div>
    );
  };
};

export default Mash;
