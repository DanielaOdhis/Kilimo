const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const { askAboutAgriculture } = require('./src/ai.js');
const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));

  const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    ssl: {
      rejectUnauthorized: false
    }
  });

  connection.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database!');
  });

  app.get('/api', (req, res) => {
    res.send('From Server');
  });

  app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO kilimo (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], (err, result) => {
      if (err) {
        console.error('Error saving user to database:', err);
        res.status(500).json({ error: 'Error saving user to database' });
        return;
      }
      res.json({ message: 'User registration successful' });
    });
  });

  app.post('/api/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const query = 'SELECT * FROM kilimo WHERE email = ? AND password=?';
    connection.query(query, [email, password], (err, result) => {
      if (err) {
        console.error('Error fetching user from database:', err);
        res.status(500).json({ error: 'Error fetching user from database' });
        return;
      }
      if (result.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      const user = result[0];
      if (user.password !== password) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      res.json({ message: 'Login successful' });
    });
  });

app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;
    const answer = await askAboutAgriculture(question);
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
