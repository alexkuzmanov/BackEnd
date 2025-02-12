import mongoose from 'mongoose'
import express from 'express'
const uri = 'mongodb+srv://mongo:Vanya7730@alex-cgm.aprcx.mongodb.net/alex-cgm'

const app = express()

mongoose.connect(uri)

const entrySchema = new mongoose.Schema({
  sgv: { type: Number },
  trendRate: { type: Number },
  device: { type: String },
  type: { type: String },
  isCalibration: { type: Boolean },
  date: { type: Number },
  dateString: { type: String },
  trend: { type: Number },
  direction: { type: String },
  utcOffset: { type: Number },
  sysTime: { type: String },
});

const Entry = mongoose.model('Entry', entrySchema);

async function fetchEntries() {
  try {
    const entries = await Entry.find().sort({ dateString: -1 }).limit(1); // Get the latest entry
    if (entries.length > 0) {
      const entry = entries[0];
      const output = (entry.sgv / 18).toFixed(1) + ' ' + entry.trend; // Example formatting
      console.log(output); // Log the output
      return output; // Return the latest output
    }
  } catch (error) {
    console.error("Error fetching entries:", error);
  }
}

// Fetch entries every 5 seconds
setInterval(async () => {
  const updatedOutput = await fetchEntries();
  app.locals.updatedOutput = updatedOutput; // Store the latest output in app.locals
}, 5000); // Update every 5 seconds (5000 ms)

// Serve the data to the client
app.get('/', (req, res) => {
  res.send(app.locals.updatedOutput || 'Waiting for data...');
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
