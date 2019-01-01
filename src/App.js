
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Animation from './Animation'

let hostUrl =  "http://192.168.2.34:24601"
// let hostUrl =  "http://localhost:5000"

class App extends Component {
  constructor(){
    super()

    this.state = {
      data: null,
      isServerOnline: false,
      value: '',
    }
    this.onClick=this.onClick.bind(this)
    this.ping=this.ping.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  test() {
    axios.get(hostUrl + '/test')
    .then(res => {
      console.log(res.data);
      this.setState({data: res.data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  ping() {
    axios.get(hostUrl + '/ping')
    .then(res => {
      if (res.data === 'ok' && !this.state.isServerOnline) {
        this.setState({isServerOnline: true})
      }
      console.log(res.data);
    })
    .catch(err => {
      this.setState({isServerOnline: false})
      console.log(err);
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.ping()
    }, 1000)
  }

  onClick(power) {
    if (power) {
      axios.post(hostUrl + '/on', {
        test: 'hi'
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else if (!power) {
      axios.get(hostUrl + '/off')
      .then(res => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  testSet() {
    let value = parseInt(this.state.value)
    console.log('value => ', value);
    axios.post(hostUrl + '/set', {
      value: value
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let statusText = this.state.isServerOnline ? 'serverStatus-online' : 'serverStatus-offline'
    return (
      <div className="default">
        <div className="serverStatus">
          <div className={statusText}>Live</div>
          {this.state.isServerOnline ?
            <div className="serverStatus-animation"></div>
          :
            null
          }
        </div>
        <div className="animationContainer">
          <Animation />
        </div>
        <div className="controlOptions">
          <div className="headerControls">Chua's Heater</div>
          <div className="options">
            <div className="on" onClick={() => this.onClick(true)}>On</div>
            <div className="off" onClick={() => this.onClick(false)}>Off</div>
          </div>
        </div>
        <div className="testSet">
          <input className='input' type="number" value={this.state.value} onChange={this.handleChange} />
          <div className="set" onClick={() => this.testSet()}>Set</div>
        </div>
      </div>
    );
  }
}

export default App;
