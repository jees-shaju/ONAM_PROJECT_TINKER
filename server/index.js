import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT || 3001);
const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const memoriesFile = path.join(serverDirectory, 'memories.json');
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    })
  : null;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

async function initializeDatabase() {
  if (!pool) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS memories (
      id TEXT PRIMARY KEY,
      memory JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const countResult = await pool.query('SELECT COUNT(*)::int AS count FROM memories');
  if (countResult.rows[0].count === 0) {
    const localMemories = await readJsonMemories();
    for (const memory of localMemories) {
      await pool.query(
        'INSERT INTO memories (id, memory) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
        [memory.id, memory]
      );
    }
  }
  console.log('Using PostgreSQL memory storage.');
}

async function readJsonMemories() {
  try {
    return JSON.parse(await fs.readFile(memoriesFile, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function readMemories() {
  if (pool) {
    const result = await pool.query('SELECT memory FROM memories ORDER BY created_at DESC');
    return result.rows.map(row => row.memory);
  }
  return readJsonMemories();
}

async function saveMemory(memory) {
  if (pool) {
    await pool.query(
      `INSERT INTO memories (id, memory)
       VALUES ($1, $2)
       ON CONFLICT (id) DO UPDATE SET memory = EXCLUDED.memory`,
      [memory.id, memory]
    );
    return;
  }

  const memories = await readJsonMemories();
  const existingIndex = memories.findIndex(item => item.id === memory.id);
  if (existingIndex >= 0) memories[existingIndex] = memory;
  else memories.unshift(memory);
  await fs.writeFile(memoriesFile, JSON.stringify(memories, null, 2) + '\n', 'utf8');
}

async function deleteMemory(id) {
  if (pool) {
    await pool.query('DELETE FROM memories WHERE id = $1', [id]);
    return;
  }

  const memories = await readJsonMemories();
  await fs.writeFile(
    memoriesFile,
    JSON.stringify(memories.filter(memory => memory.id !== id), null, 2) + '\n',
    'utf8'
  );
}

async function clearMemories() {
  if (pool) {
    await pool.query('DELETE FROM memories');
    return;
  }
  await fs.writeFile(memoriesFile, '[]\n', 'utf8');
}

app.get('/health', async (_request, response) => {
  try {
    if (pool) await pool.query('SELECT 1');
    response.json({ status: 'ok', storage: pool ? 'postgres' : 'json' });
  } catch (error) {
    console.error(error);
    response.status(503).json({ status: 'error', storage: 'postgres' });
  }
});

app.get('/api/memories', async (_request, response) => {
  try {
    response.json(await readMemories());
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Unable to read memories.' });
  }
});

app.post('/api/memories', async (request, response) => {
  const memory = request.body;
  if (!memory || !memory.id || !memory.title) {
    response.status(400).json({ error: 'A memory id and title are required.' });
    return;
  }

  try {
    const existingMemory = (await readMemories()).some(item => item.id === memory.id);
    await saveMemory(memory);
    response.status(existingMemory ? 200 : 201).json(memory);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Unable to save memory.' });
  }
});

app.delete('/api/memories/:id', async (request, response) => {
  try {
    await deleteMemory(request.params.id);
    response.status(204).send();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Unable to delete memory.' });
  }
});

app.delete('/api/memories', async (_request, response) => {
  try {
    await clearMemories();
    response.status(204).send();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Unable to clear memories.' });
  }
});

async function startServer() {
  await initializeDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`Memory API listening on port ${port}`);
  });
}

startServer().catch(error => {
  console.error('Unable to start memory API.', error);
  process.exit(1);
});
