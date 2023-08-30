const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { askAboutAgriculture } = require('./src/ai.js');
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3002'
  }));

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
