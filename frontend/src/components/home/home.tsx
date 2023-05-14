import { useEffect, useState } from 'react';
import { State } from '../../models/enums';
import { Pomodoro, StateUpdate } from '../../models/interfaces';
import { addPomodoro, getPomodoros } from '../../services/pomodoro-service';
import Clock from './clock/clock';
import './home.scss';
import { PomodoroList } from './pomodoro-list/pomodoro-list';
import { TextField } from './text-field/text-field';

const PAGE_TITLE = 'Pomodoro App';

const Home = () => {
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([]);
  const [stateContainerClass, setStateContainerClass] = useState('state-pomodoro');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    document.title = PAGE_TITLE;

    fetchPomodoros();
  }, []);

  const fetchPomodoros = async () => {
    await getPomodoros().then(pomodoros => {
      setPomodoros(pomodoros.data);
    });
  };

  const handleStateContainerClassChange = (stateContainerClass: string) => {
    setStateContainerClass(stateContainerClass);
  };

  const handleStateUpdate = async (stateUpdate: StateUpdate) => {
    addPomodoro({ goal: State[stateUpdate.state] + ' ' + goal }).then(response => {
      console.log(response.status, response.data);
      fetchPomodoros();
    });
  };

  const handleGoalUpdate = (goal: string) => {
    setGoal(goal);
  };

  return (
    <div className={'state-container ' + stateContainerClass}>
      <div className="home-elements">
        <div className="home-element">
          <Clock onChangeStateContainerClass={handleStateContainerClassChange} onChangeStateUpdate={handleStateUpdate} />
        </div>
        <div className="home-element">
          <TextField onChange={handleGoalUpdate} label="Goal" />
        </div>
        {pomodoros.length > 0 && (
          <div className="home-element">
            <PomodoroList pomodoros={pomodoros} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
