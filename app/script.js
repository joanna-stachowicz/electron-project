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

  // formatTime(time) {
  //   if (time > 60) {
  //     const minutes = time / 60;
  //   }
  //   return Math.floor(minutes) + ':' + time % 60;
  // }

  /* if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  } */

  render() {
    const { status, time, timer } = this.state;

    // console.log(formatTime(1));

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <AppDescription />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">(time)</div>}
        {/* {(status !== 'off') && <div className="timer">{formatTime(time)}</div>} */}
        {(status === 'off') && <button className="btn">Start</button>}
        {(status !== 'off') && <button className="btn">Stop</button>}
        <button className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));

