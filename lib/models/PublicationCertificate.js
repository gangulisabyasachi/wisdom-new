import mongoose from 'mongoose';

const PublicationCertificateSchema = new mongoose.Schema({
  // 🏷️ Primary Recipient Info
  recipient_name:     { type: String, required: true },
  designation:        { type: String, default: '' },
  institution:        { type: String, default: '' },
  
  // 📚 Publication Details
  book_title:         { type: String, default: '' },
  isbn:               { type: String, default: '' },
  issn:               { type: String, default: '' },
  chapter_title:      { type: String, default: '' },
  
  // 🆔 Certificate Metadata
  certificate_code:   { type: String, required: true, unique: true },
  issue_date:         { type: Date, required: true },
  details:            { type: String, default: null },
  
  // 🕒 Legacy Tracking
  legacy_id:          Number,
  original_created_at: Date,
}, { timestamps: true });

export default mongoose.models.PublicationCertificate || mongoose.model('PublicationCertificate', PublicationCertificateSchema);
