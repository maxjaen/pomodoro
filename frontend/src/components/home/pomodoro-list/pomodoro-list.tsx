import React from 'react';
import { Pomodoro } from '../../../models/interfaces';
import './pomodoro-list.scss';

type PomodoroListProperties = {
  pomodoros: Pomodoro[];
};

export const PomodoroList: React.FC<PomodoroListProperties> = ({ pomodoros }) => {
  return (
    <div className="pomodoro-list">
      {pomodoros.map(pomodoro => (
        <div className="pomodoro-list-entry" key={pomodoro.id}>
          {pomodoro.id} {pomodoro.goal}
        </div>
      ))}
    </div>
  );
};
