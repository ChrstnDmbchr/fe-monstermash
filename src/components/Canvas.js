import React, { Component } from 'react';
import "../styles/Canvas.css"

import monsterPart from "../lib/monsterPart"

class Canvas extends Component {
  state = {
    radius: 1,
    dragging: false,
    color: "black",
    token: localStorage.getItem('monstermash-id'),
    currMash: {},
    isModalActive: false,
    noAvailableMash: false,
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

  clearCanvas = (part) => {
    this.refs.canvas.width = this.refs.canvas.width;
    this.refs.canvas.getContext('2d').lineWidth = this.state.radius * 2;
    if (part === 'new') {
      this.loadCanvas(monsterPart.head)
    } else {
      this.loadCanvas(monsterPart[part])
    }
  };

  toggleModal = () => {
    this.setState({
      isModalActive: false,
      noAvailableMash: false,
      currMash: {},
    }, () => {
      this.props.history.push('/');
    });
  };

  postNewMash = () => {
    const { token } = this.state;
    const canvas = this.refs.canvas;
    let canvasData = canvas.toDataURL();

    fetch('http://localhost:3000/api/mash/newmash', {
      method: 'POST',
      headers: {
        "Authorisation": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({imageData: canvasData})
    })
    .then(res => {
      return res.json();
    })
    .then(mashRes => {
      this.setState({
        isModalActive: true
      });
    })
    .catch(err => console.log(err));
  }

  postContinueMash = () => {
    const { token, currMash } = this.state;
    if (!currMash) return;

    const canvas = this.refs.canvas;
    const canvasData = canvas.toDataURL();
   
    fetch(`http://localhost:3000/api/mash/continuemash/${currMash._id}`, {
      method: 'POST',
      headers: {
        "Authorisation": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageData: canvasData,
        currPhase: currMash.phase
      })
    })
    .then(res => {
      return res.json();
    })
    .then(mashRes => {
      this.setState({
        isModalActive: true
      });
    })
    .catch(err => console.log(err));
  };

  componentWillReceiveProps (newProps) {
    this.setState({
      currMash: {},
      noAvailableMash: false,
    }, () => {
      this.clearCanvas(newProps.match.params.stage)
    });

    const { token, radius } = this.state;

    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    context.lineWidth = radius * 2;
    canvas.addEventListener('mousemove', this.draw); 

    if (newProps.match.params.stage === 'continue') {
      fetch('http://localhost:3000/api/mash/continuemash', {
        headers: {"Authorisation": `Bearer ${token}`}
      })
      .then(res => {
        if (res.status === 404) {
          this.setState({
            noAvailableMash: true
          });
        };
        return res.json();
      })
      .then(continueMash => {
        if (continueMash.error) {
          return;
        } else {
          const { mash } = continueMash
          this.setState({
            currMash: mash
          }, () => {
            this.loadCanvas(monsterPart[mash.phase]);
          });
        };
      })
      .catch(err => console.log(err))
    } else {
      this.loadCanvas(monsterPart.head);
    };
  };

  componentDidMount () {
    const { token, radius } = this.state;

    if (!token) {
      this.props.history.push('/login');
    };

    this.setState({
      noAvailableMash: false
    });

    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');
    context.lineWidth = radius * 2;
    canvas.addEventListener('mousemove', this.draw); 

    if (this.props.match.params.stage === 'continue') {
      fetch('http://localhost:3000/api/mash/continuemash', {
        headers: {"Authorisation": `Bearer ${token}`}
      })
      .then(res => {
        if (res.status === 404) {
          this.setState({
            noAvailableMash: true
          });
        };
        return res.json();
      })
      .then(continueMash => {
        if (continueMash.error) {
          return;
        } else {
          const { mash } = continueMash
          this.setState({
            currMash: mash
          }, () => {
            this.loadCanvas(monsterPart[mash.phase]);
          });
        };
      })
      .catch(err => console.log(err))
    } else {
      this.loadCanvas(monsterPart.head);
    };
  };

  render() {
    const { currMash, isModalActive, noAvailableMash } = this.state
    return noAvailableMash ? (
      <div>
        <h1 className="title">There are currently no available Monster Mashes you can contribute to :(</h1>
        <h2 className="subtitle">why don't you try and start a new Monster Mash?</h2>
        <canvas ref="canvas" />
      </div>
      ) : (
      <div className="canvas">
        <div className="canvas-title">
          <h1 className="title">Time to start a new Monster Mash!</h1>
          <h1 className="subtitle">you are drawing the {!currMash || !currMash.phase ? 'head!' : currMash.phase + '!'}</h1>
          <h1 className="subtitle">connect your body part to the marker on the canvas so all the parts line up!</h1>
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
            <button onClick={!currMash || !currMash.phase ? this.postNewMash : this.postContinueMash} className="button nav-button">Submit Mash!</button>
          </div>
          <div className="control">
            <button className="button" onClick={() => !currMash || !currMash.phase ? this.clearCanvas() : this.clearCanvas(currMash.phase)}>Clear Canvas</button>
          </div>
        </div>
        



        <div className={`modal ${isModalActive ? 'is-active' : ''}`}>
          <div className="modal-background"></div>
            <div className="modal-content box">
              <p>Mash successfully Posted!</p>
              <br />
              <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button onClick={this.toggleModal} className="button nav-button">Go to gallery</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  };
};


export default Canvas;
