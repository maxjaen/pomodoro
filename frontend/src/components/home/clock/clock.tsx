import { useEffect, useState } from 'react';
import { ReactComponent as CoffeeIcon } from '../../../assets/icons/coffee.svg';
import { ReactComponent as ControllerIcon } from '../../../assets/icons/controller.svg';
import { ReactComponent as PlayIcon } from '../../../assets/icons/play.svg';
import { ReactComponent as SmartToyIcon } from '../../../assets/icons/smart_toy.svg';
import { ReactComponent as StopIcon } from '../../../assets/icons/stop.svg';
import { State } from '../../../models/enums';
import { StateUpdate } from '../../../models/interfaces';
import { delay, toSeconds, toStringMMSS } from '../home-utils';
import './clock.scss';

const ICON_COLOR = 'white';
const PAGE_TITLE = 'Pomodoro App';

interface ClockProperties {
  onChangeStateContainerClass: (stateContainerClass: string) => void;
  onChangeStateUpdate: (stateUpdate: StateUpdate) => void;
}

const Clock: React.FC<ClockProperties> = props => {
  const [states] = useState({
    pomodoro: { componentName: 'state-pomodoro', min: 25 },
    shortBreak: { componentName: 'state-pause-short', min: 5 },
    longBreak: { componentName: 'state-pause-long', min: 25 },
  });
  const [state, setState] = useState(states.pomodoro);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(toSeconds(state.min));
  const [isActive, setActive] = useState(false);
  const isPomodoro = (state: any) => state.componentName === 'state-pomodoro';
  const timeouts: number[] = [];

  useEffect(() => {
    document.title = PAGE_TITLE;

    if (isActive && remainingSeconds > 0) {
      const id = +setTimeout(() => {
        setRemainingSeconds((seconds: number) => seconds - 1);
      }, 1000);
      timeouts.push(id);
    }

    if (remainingSeconds < 1) {
      if (isPomodoro(state)) {
        setPomodoroCount(pomodoro => pomodoro + 1);
        props.onChangeStateUpdate({ createdAt: new Date(), state: State.SUCCESS });
      }

      const transitionToNextState = () => {
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
  }, [isActive, remainingSeconds]);

  const toggleRunning = () => {
    if (!isActive) {
      setActive(true);
    } else {
      if (remainingSeconds > 10) {
        setActive(false);
      } else {
        console.warn('Cannot stop timer with less than 10 seconds.');
      }
    }
  };

  const changeState = async (newState: any) => {
    for (const id of timeouts) {
      clearTimeout(id);
    }

    await delay(1500);

    setState(newState);
    setRemainingSeconds(toSeconds(newState.min));
    props.onChangeStateContainerClass(newState.componentName);
  };

  const updateStateOnClick = (newState: any) => {
    if (isActive && isPomodoro(newState)) {
      props.onChangeStateUpdate({ createdAt: new Date(), state: State.FAILED });
      setActive(false);
    }
    changeState(newState);
  };

  return (
    <div className="clock">
      <div className="timer">{toStringMMSS(remainingSeconds)}</div>
      <div className="board">
        <div className="board-top">
          <div
            className="board-btn"
            onClick={() => {
              updateStateOnClick(states.pomodoro);
            }}
            data-testid="pomodoro-button"
          >
            <SmartToyIcon fill={ICON_COLOR} />
          </div>
          <div
            className="board-btn"
            onClick={() => {
              updateStateOnClick(states.shortBreak);
            }}
            data-testid="short-break-button"
          >
            <CoffeeIcon fill={ICON_COLOR} />
          </div>
          <div
            className="board-btn"
            onClick={() => {
              updateStateOnClick(states.longBreak);
            }}
            data-testid="long-break-button"
          >
            <ControllerIcon fill={ICON_COLOR} />
          </div>
        </div>
        <div className="board-bottom">
          <div className="board-btn" onClick={toggleRunning} data-testid="running-button">
            {isActive ? <StopIcon fill={ICON_COLOR} /> : <PlayIcon fill={ICON_COLOR} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
