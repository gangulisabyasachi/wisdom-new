import mongoose from 'mongoose';

const PresenceSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  lastSeen: { type: Date, default: Date.now, index: { expires: '24h' } } // Auto-cleanup after 24h
}, { timestamps: true });

export default mongoose.models.Presence || mongoose.model('Presence', PresenceSchema);
