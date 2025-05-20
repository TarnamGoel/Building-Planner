const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Drawing = require('./models/Drawing');

dotenv.config();
const app = express();

// app.use(cors());
app.use(cors({
  origin: '*', // or specify your frontend origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.post('/api/save', async (req, res) => {
  try {
    const { image } = req.body;
    const newDrawing = new Drawing({ image });
    await newDrawing.save();
    res.status(201).json({ message: 'Drawing saved' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving drawing' });
  }
});

app.get('/api/images', async (req, res) => {
  try {
    const drawing = await Drawing.find().sort({ createdAt: -1 });
    res.json(drawing);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});