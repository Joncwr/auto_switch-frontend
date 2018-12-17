
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Animation from './Animation'

let hostUrl =  "http://192.168.2.34:5000"

class App extends Component {
  constructor(){
    super()

    this.state = {
      data: null,
      isServerOnline: false,
    }
    this.onClick=this.onClick.bind(this)
    this.ping=this.ping.bind(this)
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
      axios.get(hostUrl + '/on')
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
      </div>
    );
  }
}

export default App;
