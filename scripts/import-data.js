/**
 * WISDOM Database Import Script
 * Reads phpMyAdmin JSON export and imports ALL tables into MongoDB Atlas
 * Tables: announcements, journals, users, publication_certificates, password_resets
 *
 * Usage: npm run import-data
 */

import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ── Schemas ─────────────────────────────────────────────────────────────────

const JournalSchema = new mongoose.Schema({
  legacy_id:           Number,
  user_id:             Number,
  topic:               String,
  slug:                String,
  authors:             String,
  affiliations:        String,
  published_date:      Date,
  volume:              Number,
  issue:               Number,
  page:                String,
  abstract:            String,
  body:                String,
  pdf_path:            String,
  citation:            String,
  doi:                 String,
  keywords:            String,
  original_created_at: Date,
}, { timestamps: true });

const AnnouncementSchema = new mongoose.Schema({
  legacy_id:           Number,
  title:               String,
  body:                String,
  announcement_date:   Date,
  link:                String,
  original_created_at: Date,
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  legacy_id:           Number,
  name:                String,
  email:               String,
  password:            String,   // hashed — kept as-is
  role:                String,
  email_verified_at:   Date,
  remember_token:      String,
  original_created_at: Date,
}, { timestamps: true });

const PublicationCertificateSchema = new mongoose.Schema({
  legacy_id:           Number,
  user_id:             Number,
  journal_id:          Number,
  certificate_number:  String,
  author_name:         String,
  issued_date:         Date,
  pdf_path:            String,
  original_created_at: Date,
}, { timestamps: true });

// Flexible schema — password_resets can have varied columns
const PasswordResetSchema = new mongoose.Schema({
  email:      String,
  token:      String,
  created_at: Date,
}, { timestamps: false });

// ── Models ───────────────────────────────────────────────────────────────────

const Journal                = mongoose.models.Journal                || mongoose.model('Journal',                JournalSchema);
const Announcement           = mongoose.models.Announcement           || mongoose.model('Announcement',           AnnouncementSchema);
const User                   = mongoose.models.User                   || mongoose.model('User',                   UserSchema);
const PublicationCertificate = mongoose.models.PublicationCertificate || mongoose.model('PublicationCertificate', PublicationCertificateSchema);
const PasswordReset          = mongoose.models.PasswordReset          || mongoose.model('PasswordReset',          PasswordResetSchema);

// ── Helpers ──────────────────────────────────────────────────────────────────

const toDate = (str) => (str ? new Date(str) : null);
const toInt  = (val) => (val !== undefined && val !== null && val !== '' ? parseInt(val) : null);

// Generic importer — maps ALL fields from a row dynamically
async function importTable(Model, rows, mapFn, label) {
  if (!rows || rows.length === 0) {
    console.log(`   ⚠️  No data found for ${label}, skipping.\n`);
    return;
  }
  console.log(`📦 Importing ${label}...`);
  await Model.deleteMany({});
  const docs = rows.map(mapFn);
  await Model.insertMany(docs, { ordered: false });
  console.log(`   ✅ Imported ${docs.length} ${label} record(s)\n`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const exportPath = join(__dirname, '..', 'wisdom_export.json');

  console.log('\n─────────────────────────────────────────────');
  console.log('  WISDOM MongoDB Import Script');
  console.log('─────────────────────────────────────────────\n');

  // 1. Read file
  console.log('📂 Reading wisdom_export.json...');
  let raw;
  try {
    raw = readFileSync(exportPath, 'utf-8');
  } catch (e) {
    console.error('❌ Could not find wisdom_export.json in the project root.');
    process.exit(1);
  }

  const parsed = JSON.parse(raw);
  const tables = parsed.filter(item => item.type === 'table');

  const find = (name) => tables.find(t => t.name === name)?.data ?? [];

  console.log('   Tables found in export:');
  tables.forEach(t => console.log(`   - ${t.name} (${t.data?.length ?? 0} rows)`));
  console.log('');

  // 2. Connect
  console.log('🔌 Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('   ✅ Connected!\n');

  // 3. Import each table

  await importTable(Announcement, find('announcements'), (row) => ({
    legacy_id:           toInt(row.id),
    title:               row.title               || '',
    body:                row.body                || '',
    announcement_date:   toDate(row.announcement_date),
    link:                row.link                || '',
    original_created_at: toDate(row.created_at),
  }), 'Announcements');

  await importTable(Journal, find('journals'), (row) => ({
    legacy_id:           toInt(row.id),
    user_id:             toInt(row.user_id),
    topic:               row.topic               || '',
    slug:                row.slug                || '',
    authors:             row.authors             || '',
    affiliations:        row.affiliations        || '',
    published_date:      toDate(row.published_date),
    volume:              toInt(row.volume),
    issue:               toInt(row.issue),
    page:                row.page                || '',
    abstract:            row.abstract            || '',
    body:                row.body                || '',
    pdf_path:            row.pdf_path            || '',
    citation:            row.citation            || '',
    doi:                 row.doi                 || '',
    keywords:            row.keywords            || '',
    original_created_at: toDate(row.created_at),
  }), 'Journals');

  await importTable(User, find('users'), (row) => ({
    legacy_id:           toInt(row.id),
    name:                row.name                || '',
    email:               row.email               || '',
    password:            row.password            || '',
    role:                row.role                || 'user',
    email_verified_at:   toDate(row.email_verified_at),
    remember_token:      row.remember_token      || '',
    original_created_at: toDate(row.created_at),
  }), 'Users');

  await importTable(PublicationCertificate, find('publication_certificates'), (row) => ({
    legacy_id:           toInt(row.id),
    user_id:             toInt(row.user_id),
    journal_id:          toInt(row.journal_id),
    certificate_number:  row.certificate_number  || '',
    author_name:         row.author_name         || '',
    issued_date:         toDate(row.issued_date),
    pdf_path:            row.pdf_path            || '',
    original_created_at: toDate(row.created_at),
  }), 'Publication Certificates');

  await importTable(PasswordReset, find('password_resets'), (row) => ({
    email:      row.email || '',
    token:      row.token || '',
    created_at: toDate(row.created_at),
  }), 'Password Resets');

  // 4. Done
  console.log('─────────────────────────────────────────────');
  console.log('  ✅ All tables imported successfully!');
  console.log('─────────────────────────────────────────────');
  console.log('\nGo to MongoDB Atlas → Browse Collections → wisdomDB to verify.\n');

  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => {
  console.error('\n❌ Import failed:', err.message);
  console.error(err);
  process.exit(1);
});
