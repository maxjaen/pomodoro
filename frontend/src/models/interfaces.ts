import { State } from './enums';

export interface Pomodoro {
  id: number;
  goal: string;
}

export interface PomodoroCreate {
  goal: string;
}

export interface StateUpdate {
  createdAt: Date;
  state: State;
}
