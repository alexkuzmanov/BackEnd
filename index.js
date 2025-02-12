import mongoose from 'mongoose'
import express from 'express'
const uri = 'mongodb+srv://mongo:Vanya7730@alex-cgm.aprcx.mongodb.net/alex-cgm'

const app = express()


mongoose.connect(uri)

const entrySchema = new mongoose.Schema({
    sgv: Number,
});

const Entry = mongoose.model('Entry', entrySchema);
async function fetchEntries() {
    const entries = await Entry.find().sort( {dateString: -1} ).limit(1); // Limits to the 10 most recent entries

    entries.forEach(entry => {
        const entryValue = (entry.sgv/18).toFixed(1)
        app.get('/', (req, res) => {
            console.log (entryValue)
            res.send(entryValue)
        })
    });
}   

fetchEntries()

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
  });