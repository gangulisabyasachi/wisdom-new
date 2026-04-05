import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SOURCE_FILE = '/Users/sabyasachiganguli/Downloads/wisdom (1).json';
const OUTPUT_FILE = path.join(__dirname, 'restoration_data.json');

function transform() {
    console.log(`📖 Reading source file: ${SOURCE_FILE}`);
    
    if (!fs.existsSync(SOURCE_FILE)) {
        console.error("❌ Source file not found!");
        process.exit(1);
    }

    const rawData = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
    
    const result = {
        users: [],
        announcements: [],
        journals: [],
        publication_certificates: []
    };

    // Table names in the JSON export
    const TABLE_MAPPING = {
        'users': 'users',
        'announcements': 'announcements',
        'journals': 'journals',
        'publication_certificates': 'publication_certificates'
    };

    rawData.forEach(item => {
        if (item.type === 'table' && TABLE_MAPPING[item.name]) {
            const targetKey = TABLE_MAPPING[item.name];
            console.log(`📦 Found table: ${item.name} (${item.data.length} records)`);
            result[targetKey] = item.data;
        }
    });

    // Verification of requested IDs (optional logging)
    const journalIds = result.journals.map(j => j.id);
    const requestedJournalIds = ["17","18","19","20","21","22","23","24","27","28","29","30","31","32","33"];
    const missingJournals = requestedJournalIds.filter(id => !journalIds.includes(id));
    
    if (missingJournals.length > 0) {
        console.warn(`⚠️ Warning: Missing Journal IDs in source: ${missingJournals.join(', ')}`);
    } else {
        console.log("✅ All requested Journal IDs found.");
    }

    const certIds = result.publication_certificates.map(c => c.id);
    const requestedCertIds = ["120","121","122","123","124","125","128","129","130","132","137","140","141","142","143","144","146","147","148","149","150","151","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186"];
    const missingCerts = requestedCertIds.filter(id => !certIds.includes(id));

    if (missingCerts.length > 0) {
        console.warn(`⚠️ Warning: Missing Certificate IDs in source: ${missingCerts.join(', ')}`);
    } else {
        console.log("✅ All requested Certificate IDs found.");
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
    console.log(`🚀 Transformation complete! Saved to ${OUTPUT_FILE}`);
}

transform();
