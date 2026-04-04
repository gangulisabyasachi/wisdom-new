import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
  title:             { type: String, required: true },
  body:              { type: String, default: '' },   // HTML content from rich text editor
  announcement_date: { type: Date, required: true },
  link:              { type: String, default: '' },   // Optional external URL
}, { timestamps: true });

export default mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);
