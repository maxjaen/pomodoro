interface Pomodoro {
  id: number;
  goal: string;
}

interface PomodoroCreate {
  goal: string;
}

export type { Pomodoro, PomodoroCreate };
