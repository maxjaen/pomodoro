import React from 'react';
import { Pomodoro } from '../../../models/interfaces';
import './pomodoro-list.scss';

type PomodoroListProperties = {
  pomodoros: Pomodoro[];
};

export const PomodoroList: React.FC<PomodoroListProperties> = ({ pomodoros }) => {
  return (
    <table className="pomodoro-list">
      {pomodoros.map(pomodoro => (
        <tr className="pomodoro-list-entry" key={pomodoro.id}>
          <td>{pomodoro.id}</td>
          <td>{pomodoro.goal}</td>
        </tr>
      ))}
    </table>
  );
};
