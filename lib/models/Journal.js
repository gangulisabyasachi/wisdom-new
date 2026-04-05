import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
  topic:          { type: String, required: true },
  authors:        { type: String, required: true },
  affiliations:   { type: String, default: '' },
  doi:            { type: String, default: '' },
  keywords:       { type: String, default: '' },
  published_date: { type: Date, required: true },
  volume:         { type: Number, required: true },
  issue:          { type: Number, required: true },
  page:           { type: String, default: '' },
  abstract:       { type: String, default: '' },
  body:           { type: String, default: '' },   // Full HTML article text
  pdf_path:       { type: String, default: '' },   // Path or URL to PDF file
  slug:           { type: String, unique: true },  // URL-friendly identifier e.g. "ai-legal-systems"
}, { timestamps: true });

// Auto-generate slug from topic before saving
JournalSchema.pre('save', function() {
  if (this.topic && !this.slug) {
    this.slug = this.topic
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 80);
  }
});

// If in development, prevent stale schemas from sticking around in memory
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Journal;
}

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);
