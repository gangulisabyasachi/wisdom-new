import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  authors: { type: String, required: true },
  abstract: { type: String, required: true },
  volume: { type: String },
  issue: { type: String },
  page: { type: String },
  published_date: { type: Date },
  citation: { type: String },
});

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);
