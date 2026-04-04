import mongoose from 'mongoose';

const PublicationCertificateSchema = new mongoose.Schema({
  legacy_id:          Number,
  user_id:            Number,
  journal_id:         Number,
  certificate_number: String,
  author_name:        String,
  issued_date:        Date,
  pdf_path:           String,
  original_created_at: Date,
}, { timestamps: true });

export default mongoose.models.PublicationCertificate || mongoose.model('PublicationCertificate', PublicationCertificateSchema);
