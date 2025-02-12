import mongoose from 'mongoose'
// Replace with your actual MongoDB URI
const uri = 'mongodb+srv://mongo:Vanya7730@alex-cgm.aprcx.mongodb.net/alex-cgm'

mongoose.connect(uri)
console.log ('db connected')

const entrySchema = new mongoose.Schema({
    sgv: Number,
});

const Entry = mongoose.model('Entry', entrySchema);
async function fetchEntries() {
    const entries = await Entry.find().sort( {dateString: -1} ).limit(1); // Limits to the 10 most recent entries

    entries.forEach(entry => {
        const entryValue = (entry.sgv/18).toFixed(1)
        console.log (entryValue)
    });
}   

fetchEntries()