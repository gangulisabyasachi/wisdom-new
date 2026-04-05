const { connectDB } = require('./lib/db');
const Journal = require('./lib/models/Journal').default;

async function checkData() {
  try {
    await connectDB();
    const count = await Journal.countDocuments();
    console.log(`Total Journals: ${count}`);
    const latest = await Journal.find().sort({ published_date: -1 }).limit(1).lean();
    console.log('Latest Journal:', JSON.stringify(latest, null, 2));
  } catch (err) {
    console.error('Check Data Error:', err);
  } finally {
    process.exit(0);
  }
}

checkData();
