import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  announcement_date: { type: Date },
  link: { type: String }
});

export default mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);
