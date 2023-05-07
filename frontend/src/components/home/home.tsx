import { useEffect, useState } from 'react';
import { delay, toSeconds, toStringMMSS } from './home-utils';
import './home.scss';

const PAGE_TITLE = 'Pomodoro App';

const Home = () => {
  const [states] = useState({
    pomodoro: { componentName: 'state-pomodoro', min: 25 },
    shortBreak: { componentName: 'state-pause-short', min: 5 },
    longBreak: { componentName: 'state-pause-long', min: 25 },
  });
  const [state, setState] = useState(states.pomodoro);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(toSeconds(state.min));
  const [isActive, setActive] = useState(false);
  const isPomodoro = (state: any) => state.componentName === 'pomodoro';

  useEffect(() => {
    document.title = PAGE_TITLE;

    if (isActive && remainingSeconds > 0) {
      setTimeout(() => {
        setRemainingSeconds((seconds: number) => seconds - 1);
      }, 1000);
    }

    if (remainingSeconds < 1) {
      if (isPomodoro(state)) {
        setPomodoroCount(pomodoro => pomodoro + 1);
      }

      const transitionToNextState = () => {
        setActive(true);

        if (isPomodoro(state)) {
          if (pomodoroCount !== 0 && (pomodoroCount + 1) % 4 === 0) {
            changeState(states.longBreak);
          } else {
            changeState(states.shortBreak);
          }
        } else {
          changeState(states.pomodoro);
        }
      };
      transitionToNextState();
    }
  }, [isActive, remainingSeconds, state, pomodoroCount, states.longBreak, states.shortBreak, states.pomodoro]);

  const start = () => {
    if (!isActive) {
      setActive(true);
      setRemainingSeconds((seconds: number) => seconds - 1);
    } else {
      console.warn('Timer already active');
    }
  };

  const stop = () => {
    if (remainingSeconds > 10) {
      setActive(false);
    } else {
      console.warn('Cannot stop timer with less than 10 seconds.');
    }
  };

  const toggleRunning = () => {
    if (!isActive) {
      start();
    } else {
      stop();
    }
  };

  const changeState = async (state: any) => {
    await delay(1500);

    setState(state);
    setRemainingSeconds(toSeconds(state.min));
  };

  return (
    <div className={'state-container ' + state.componentName}>
      <div className="clock">
        <div className="timer">{toStringMMSS(remainingSeconds)}</div>
        <div className="board">
          <div className="board-top">
            <div
              className="board-btn"
              onClick={() => {
                setActive(false);
                changeState(states.pomodoro);
              }}
              data-testid="pomodoro-button"
            ></div>
            <div
              className="board-btn"
              onClick={() => {
                setActive(false);
                changeState(states.shortBreak);
              }}
              data-testid="short-break-button"
            ></div>
            <div
              className="board-btn"
              onClick={() => {
                setActive(false);
                changeState(states.longBreak);
              }}
              data-testid="long-break-button"
            ></div>
          </div>
          <div className="board-middle">
            <div className="board-btn" onClick={toggleRunning} data-testid="running-button"></div>
          </div>
          <div className="board-bottom">
            <div className="board-btn" data-testid="toggle-settings-button">
              {pomodoroCount + ' Pomodoro(s)'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
