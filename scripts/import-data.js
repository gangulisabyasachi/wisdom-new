import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Setup Models (Standalone)
const UserSchema = new mongoose.Schema({
  legacy_id:           Number,
  name:                { type: String, required: true },
  email:               { type: String, required: true, unique: true },
  password:            { type: String },
  role:                { type: String, default: 'admin' },
  original_created_at: Date,
}, { timestamps: true });

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
  body:           { type: String, default: '' },
  pdf_path:       { type: String, default: '' },
  slug:           { type: String, unique: true },
}, { timestamps: true });

const AnnouncementSchema = new mongoose.Schema({
  title:             { type: String, required: true },
  body:              { type: String, default: '' },
  announcement_date: { type: Date, required: true },
  link:              { type: String, default: '' },
}, { timestamps: true });

const CertificateSchema = new mongoose.Schema({
  recipient_name:     { type: String, required: true },
  designation:        { type: String, default: '' },
  institution:        { type: String, default: '' },
  book_title:         { type: String, default: '' },
  isbn:               { type: String, default: '' },
  issn:               { type: String, default: '' },
  chapter_title:      { type: String, default: '' },
  certificate_code:   { type: String, required: true, unique: true },
  issue_date:         { type: Date, required: true },
  details:            { type: String, default: null },
  legacy_id:          Number,
  original_created_at: Date,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Journal = mongoose.model('Journal', JournalSchema);
const Announcement = mongoose.model('Announcement', AnnouncementSchema);
const Certificate = mongoose.model('PublicationCertificate', CertificateSchema);

function safeDate(dateStr) {
    if (!dateStr || 
        dateStr === 'NULL' || 
        dateStr === '0000-00-00 00:00:00' || 
        dateStr === '0000-00-00' || 
        dateStr === 'Invalid Date'
    ) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
}

async function run() {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI missing from .env.local");

    try {
        await mongoose.connect(uri);
        console.log("✅ Connected to MongoDB.");

        // 1. Load Extracted Data
        const dataPath = path.join(__dirname, 'restoration_data.json');
        if (!fs.existsSync(dataPath)) throw new Error("restoration_data.json not found. Run prepare-migration.js first!");
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // 🧹 PURGE (Danger Zone)
        console.log("🧹 Purging existing data...");
        await User.deleteMany({});
        await Journal.deleteMany({});
        await Announcement.deleteMany({});
        await Certificate.deleteMany({});
        console.log("✅ Collections Wiped.");

        // 📥 IMPORT USERS
        if (data.users && data.users.length > 0) {
            console.log(`👤 Importing ${data.users.length} users...`);
            const userOps = data.users.map(u => ({
                legacy_id: Number(u.id),
                name: u.name || (u.email ? u.email.split('@')[0] : 'Admin'),
                email: u.email,
                password: u.password,
                role: 'admin',
                original_created_at: safeDate(u.created_at) || new Date()
            }));
            await User.insertMany(userOps);
            console.log("   ✅ Users Imported.");
        }

        // 📥 IMPORT ANNOUNCEMENTS
        if (data.announcements && data.announcements.length > 0) {
            console.log(`📢 Importing ${data.announcements.length} announcements...`);
            for (const a of data.announcements) {
                try {
                    await Announcement.create({
                        title: a.title,
                        body: a.body,
                        announcement_date: safeDate(a.announcement_date) || new Date(),
                        link: a.link || ''
                    });
                } catch (e) {
                    console.warn(`⚠️ Failed to import announcement ID ${a.id}: ${e.message}`);
                }
            }
            console.log("   ✅ Announcements Imported.");
        }

        // 📥 IMPORT JOURNALS
        if (data.journals && data.journals.length > 0) {
            console.log(`📚 Importing ${data.journals.length} journals...`);
            let count = 0;
            for (const j of data.journals) {
                try {
                    await Journal.create({
                        topic: j.topic,
                        slug: j.slug || `journal-${j.id}-${Date.now()}`,
                        authors: j.authors || 'Unknown',
                        affiliations: j.affiliations || '',
                        published_date: safeDate(j.published_date) || new Date(),
                        volume: Number(j.volume) || 1,
                        issue: Number(j.issue) || 1,
                        page: j.page || '',
                        abstract: j.abstract || '',
                        body: j.body || '',
                        pdf_path: j.pdf_path || '',
                        doi: j.doi || '',
                        keywords: j.keywords || ''
                    });
                    count++;
                } catch (e) {
                    console.warn(`⚠️ Failed to import journal ID ${j.id} (${j.topic.substring(0, 30)}...): ${e.message}`);
                }
            }
            console.log(`   ✅ ${count} Journals Imported.`);
        }

        // 📥 IMPORT CERTIFICATES
        if (data.publication_certificates && data.publication_certificates.length > 0) {
            console.log(`📜 Importing ${data.publication_certificates.length} certificates...`);
            let count = 0;
            for (const c of data.publication_certificates) {
                try {
                    await Certificate.create({
                        recipient_name: c.recipient_name,
                        designation: c.designation || '',
                        institution: c.institution || '',
                        book_title: c.book_title || '',
                        isbn: c.isbn || '',
                        issn: c.issn || '',
                        chapter_title: c.chapter_title || '',
                        certificate_code: c.certificate_code,
                        issue_date: safeDate(c.issue_date) || new Date(),
                        details: c.details || null,
                        legacy_id: Number(c.id),
                        original_created_at: safeDate(c.created_at) || new Date()
                    });
                    count++;
                } catch (e) {
                    // console.warn(`⚠️ Failed to import certificate ID ${c.id}: ${e.message}`);
                }
            }
            console.log(`   ✅ ${count} Certificates Imported.`);
        }

        console.log("✨ RESTORATION COMPLETE!");
        console.log("🚀 You can now log in with your original email and password.");
    } catch (err) {
        console.error("❌ FAILED:", err);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

run();
