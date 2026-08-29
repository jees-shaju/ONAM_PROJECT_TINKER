import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    })
  : null;
const tempMemoriesFile = path.join('/tmp', 'maveli-memories.json');
const repoMemoriesFile = path.join(process.cwd(), 'server', 'memories.json');

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
    const localMemories = await readJsonMemories(await getFallbackMemoriesFile());
    for (const memory of localMemories) {
      await pool.query(
        'INSERT INTO memories (id, memory) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
        [memory.id, memory]
      );
    }
  }
  console.log('Using PostgreSQL memory storage for Vercel runtime.');
}

async function getFallbackMemoriesFile() {
  try {
    await fs.access(tempMemoriesFile);
    return tempMemoriesFile;
  } catch {
    try {
      await fs.access(repoMemoriesFile);
      await fs.copyFile(repoMemoriesFile, tempMemoriesFile);
      return tempMemoriesFile;
    } catch {
      await fs.writeFile(tempMemoriesFile, '[]\n', 'utf8');
      return tempMemoriesFile;
    }
  }
}

async function readJsonMemories(filePath) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
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

  const filePath = await getFallbackMemoriesFile();
  return readJsonMemories(filePath);
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

  const filePath = await getFallbackMemoriesFile();
  const memories = await readJsonMemories(filePath);
  const existingIndex = memories.findIndex(item => item.id === memory.id);
  if (existingIndex >= 0) memories[existingIndex] = memory;
  else memories.unshift(memory);
  await fs.writeFile(filePath, JSON.stringify(memories, null, 2) + '\n', 'utf8');
}

async function deleteMemory(id) {
  if (pool) {
    await pool.query('DELETE FROM memories WHERE id = $1', [id]);
    return;
  }

  const filePath = await getFallbackMemoriesFile();
  const memories = await readJsonMemories(filePath);
  await fs.writeFile(
    filePath,
    JSON.stringify(memories.filter(memory => memory.id !== id), null, 2) + '\n',
    'utf8'
  );
}

async function clearMemories() {
  if (pool) {
    await pool.query('DELETE FROM memories');
    return;
  }

  const filePath = await getFallbackMemoriesFile();
  await fs.writeFile(filePath, '[]\n', 'utf8');
}

const readyPromise = initializeDatabase().catch(error => {
  console.error('Unable to initialize memory storage for Vercel runtime.', error);
});

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
    await readyPromise;
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
    await readyPromise;
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
    await readyPromise;
    await deleteMemory(request.params.id);
    response.status(204).send();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Unable to delete memory.' });
  }
});

app.delete('/api/memories', async (_request, response) => {
  try {
    await readyPromise;
    await clearMemories();
    response.status(204).send();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Unable to clear memories.' });
  }
});

export default app;
