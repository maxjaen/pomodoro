import axios, { AxiosResponse } from 'axios';
import { PomodoroCreate } from '../models/interfaces';

const POMODOROS = '/pomodoros';

export async function getPomodoros(): Promise<AxiosResponse> {
  return axios.get(`${process.env.REACT_APP_API_BACKEND_URL}${POMODOROS}`);
}

export async function addPomodoro(pomodoro: PomodoroCreate): Promise<AxiosResponse> {
  return axios.post(`${process.env.REACT_APP_API_BACKEND_URL}${POMODOROS}`, pomodoro);
}
