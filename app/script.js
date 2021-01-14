import React from 'react';
import { render } from 'react-dom';

class AppDescription extends React.Component {

  render() {
    return (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20.
           It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    );
  }
};
class App extends React.Component {
  state = {
    status: 'off',
    time: 1200,
    timer: null,
  }

  formatTime(time) {   // przyjmuje 1 arg. w postaci liczbowej - arg. reprezentuje liczbę sekund
    let minutes = Math.floor(time / 60);
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  };                    // funkcja ma zwracać stringa w formacie mm:ss, gdzie mm - liczba minut (wynik time / 60), ss - liczba sekund (% z dzielenia time / 60)

  startTimer() {
    this.setState({
      timer: setInterval(() => { this.step(); }, 1000),
      time: 1200,
      status: 'work',
    });
  };

  step() {
    let newTime = this.state.time - 1;
    let newStatus = this.state.status;

    if (newTime === 0) {
      this.playBell();
      if (newStatus === 'work') {
        newStatus = 'rest';
        newTime = 20;
      }
      else if (newStatus === 'rest') {
        newStatus = 'work';
        newTime = 1200;
      }
    }

    this.setState({
      time: newTime,
      status: newStatus,
    });
  };

  stopTimer() {
    clearInterval(this.state.timer);
    this.setState({
      time: 0,
      status: 'off',
    });
  }

  closeApp() {
    window.close();
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  render() {
    const { status, time, timer } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <AppDescription />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
        {(status === 'off') && <button className="btn" onClick={() => this.startTimer()}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={() => this.stopTimer()}>Stop</button>}
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));

