import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3000;
const urlPomodoros = '/pomodoros';

app.use(express.json());
app.use(function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const pool = new Pool({
  user: 'user',
  password: 'password',
  database: 'database',
  host: 'postgres_db',
  port: 5432,
});

interface Pomodoro {
  id: number;
  goal: string;
}

app.post(urlPomodoros, async (req: Request, res: Response) => {
  const { goal } = req.body;

  try {
    const result = await pool.query<Pomodoro>('INSERT INTO pomodoros(goal) VALUES($1) RETURNING *', [goal]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving pomodoro to database' });
  }
});

app.get(urlPomodoros, async (_req: Request, res: Response) => {
  try {
    const result = await pool.query<Pomodoro[]>('SELECT * FROM pomodoros');
    if (result.rows.length === 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(result.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving pomodoro from database' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
