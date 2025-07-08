const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// Replace with your actual MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/realestatecrm';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('MongoDB connected!'));

// Lead Schema
const leadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  source: String,
  project: String,
  assignedTo: String,
  status: String,
  nurturingStage: String,
  nurturingProgress: Number,
  lastContact: String,
  lastContactType: String,
  createdDate: String,
  budget: String,
  unitType: String,
  timeline: String,
  followUpStatus: String
});

const Lead = mongoose.model('Lead', leadSchema);

// API Endpoints

// Get all leads
app.get('/api/leads', async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// Add a new lead
app.post('/api/leads', async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.status(201).json(lead);
});

// Update a lead
app.put('/api/leads/:id', async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  res.json(lead);
});

// Delete a lead
app.delete('/api/leads/:id', async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
