import express from 'express';
import cors from 'cors';
import db from './db.js';  // Make sure to include the .js extension

const app = express();
app.use(express.json());
app.use(cors());

// Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM recipe ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query('SELECT * FROM recipe WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create new recipe
app.post('/api/recipes', async (req, res) => {
  const { name, description, instructions, prep_time, cook_time, chef_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO recipe (name, description, instructions, prep_time, cook_time, chef_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, instructions, prep_time, cook_time, chef_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
