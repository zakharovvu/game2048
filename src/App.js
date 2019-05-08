import React from 'react';
import './App.css';

class App extends React.Component {
  winer = false;
  state = {
    dataSquares: Array(16).fill(''),
    direction: {
      top: [[0,4,8,12], [1,5,9,13], [2,6,10,14], [3,7,11,15]],
      left: [[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]],
      right: [[3,2,1,0], [7,6,5,4], [11,10,9,8], [15,14,13,12]],
      bottom: [[12,8,4,0], [13,9,5,1], [14,10,6,2], [15,11,7,3]],
    },
  }
  probability() {
    if ( (Math.floor(Math.random() * 100)) > 90.9090909) {
      return 4
    } else {
      return 2
    }
  }
  setRandom() {
    let arrData = this.state.dataSquares;
    while (true) {
      let number = Math.floor(Math.random() * 16);
      if (arrData[number] === '') {
        arrData[number] = this.probability();
        this.setState({dataSquares: arrData})
        break;
      }
    }
  }
  handleKeyboard = (e) => {
    e.preventDefault()
    switch(e.key) {
      case "ArrowUp": this.results(this.state.direction.top)
      break
      case "ArrowDown": this.results(this.state.direction.bottom)
      break
      case "ArrowLeft": this.results(this.state.direction.left)
      break
      case "ArrowRight": this.results(this.state.direction.right)
      break
      default:
      break
    }
  }
  results = (direction) => {
    let elements = [...this.state.dataSquares]
    let elements2 = [...this.state.dataSquares]
    direction.map((el, index) => {
      let arr = []
      for (let i = 0; i < 4; i++) {
        if (elements[el[i]] !== '') arr.push(elements[el[i]])
      }
      let arr2 = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
          arr2.push(arr[i] * 2)
          i = i + 1
        } else {
          arr2.push(arr[i])
        }
      }
      let arrResult = [...arr2]
      for (let i = 0; i < 4 - arr2.length; i++) {
        arrResult.push('')
      }
      for (let i = 0; i < 4; i++) {
        elements[direction[index][i]] = arrResult[i]
      }
      return arrResult
    })
    this.setState({dataSquares: elements})
    let count = 0
    elements.map((_, i) => elements[i] === elements2[i] && elements[i] !== '' ? count++ : '')
    if (count === 16) return alert('Game over :(') 
    elements.map(el => {
      if (this.winer === false) {
        if (el === 2048) {
          alert('Победа! :)');
          this.winer = true;
        }
      }
    })
    this.setRandom()
  }
  handleReset = () => {
    this.setState({dataSquares: Array(16).fill('')},
    () => {
      this.setRandom()
      this.setRandom()  
    })
  }
  componentDidMount() {
    document.addEventListener('keyup', (e) => this.handleKeyboard(e))
    this.setRandom()
    this.setRandom()
  }
  render() {
       
    return (
      <>
      <button className="reset" onClick={this.handleReset}>Reset game 2048</button>
      <div className="game">
        {this.state.dataSquares.map((el, i) => {
          return (
            <div key={i} className="square">{el}</div>
          )
        })}
      </div>
      </>
    );
  }
}

export default App;
