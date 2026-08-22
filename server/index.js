import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || 3001);
const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const memoriesFile = path.join(serverDirectory, 'memories.json');

app.use(cors());
app.use(express.json({ limit: '1mb' }));

async function readMemories() {
  try {
    return JSON.parse(await fs.readFile(memoriesFile, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeMemories(memories) {
  await fs.mkdir(serverDirectory, { recursive: true });
  await fs.writeFile(memoriesFile, JSON.stringify(memories, null, 2) + '\n', 'utf8');
}

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
    const memories = await readMemories();
    const existingIndex = memories.findIndex(item => item.id === memory.id);
    if (existingIndex >= 0) {
      memories[existingIndex] = memory;
    } else {
      memories.unshift(memory);
    }
    await writeMemories(memories);
    response.status(existingIndex >= 0 ? 200 : 201).json(memory);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Unable to save memory.' });
  }
});

app.delete('/api/memories/:id', async (request, response) => {
  try {
    const memories = await readMemories();
    const remainingMemories = memories.filter(memory => memory.id !== request.params.id);
    await writeMemories(remainingMemories);
    response.status(204).send();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Unable to delete memory.' });
  }
});

app.delete('/api/memories', async (_request, response) => {
  try {
    await writeMemories([]);
    response.status(204).send();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Unable to clear memories.' });
  }
});

app.listen(port, () => {
  console.log(`Memory API listening on http://localhost:${port}`);
});
