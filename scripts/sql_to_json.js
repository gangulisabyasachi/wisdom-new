import fs from 'fs';
import path from 'path';

const sqlPath = '/Users/sabyasachiganguli/Desktop/wisdom/wisdom_restoration.sql';
const outputPath = '/Users/sabyasachiganguli/Desktop/code/wisdom new/main website/scripts/restoration_data.json';

const content = fs.readFileSync(sqlPath, 'utf8');

// Robust parser for SQL INSERT VALUES
function splitSqlValues(valuesPart) {
    const results = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';
    let escaped = false;

    for (let i = 0; i < valuesPart.length; i++) {
        const char = valuesPart[i];

        if (escaped) {
            current += char;
            escaped = false;
            continue;
        }

        if (char === '\\') {
            escaped = true;
            current += char;
            continue;
        }

        if ((char === "'" || char === '"') && !inQuotes) {
            inQuotes = true;
            quoteChar = char;
            current += char;
        } else if (char === quoteChar && inQuotes) {
            inQuotes = false;
            current += char;
        } else if (char === ',' && !inQuotes) {
            results.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    results.push(current.trim());
    return results.map(val => {
        if (val === 'NULL') return null;
        if (val.startsWith("'") && val.endsWith("'")) {
            return val.slice(1, -1)
                .replace(/\\'/g, "'")
                .replace(/\\"/g, '"')
                .replace(/\\n/g, "\n")
                .replace(/\\r/g, "\r")
                .replace(/\\\\/g, "\\");
        }
        return val;
    });
}

function parseInsert(tableName) {
    const allRecords = [];
    const searchStr = `INSERT INTO \`${tableName}\``;
    let offset = 0;

    while (true) {
        const startIdx = content.indexOf(searchStr, offset);
        if (startIdx === -1) break;

        // Find the start of VALUES
        const valuesIdx = content.indexOf('VALUES', startIdx);
        if (valuesIdx === -1) {
            offset = startIdx + searchStr.length;
            continue;
        }

        let i = valuesIdx + 6;
        let inString = false;
        let quoteChar = '';
        let escaped = false;
        let depth = 0;
        let currentRow = '';
        let statementEnded = false;

        while (i < content.length && !statementEnded) {
            const char = content[i];

            if (escaped) {
                if (depth > 0) currentRow += char;
                escaped = false;
                i++;
                continue;
            }

            if (char === '\\') {
                if (depth > 0) currentRow += char;
                escaped = true;
                i++;
                continue;
            }

            if ((char === "'" || char === '"')) {
                if (!inString) {
                    inString = true;
                    quoteChar = char;
                } else if (char === quoteChar) {
                    inString = false;
                }
                if (depth > 0) currentRow += char;
            } else if (!inString) {
                if (char === '(') {
                    depth++;
                    if (depth === 1) currentRow = '';
                    else currentRow += char;
                } else if (char === ')') {
                    depth--;
                    if (depth === 0) {
                        allRecords.push(splitSqlValues(currentRow));
                        currentRow = '';
                    } else {
                        currentRow += char;
                    }
                } else if (char === ';' && depth === 0) {
                    statementEnded = true;
                } else if (depth > 0) {
                    currentRow += char;
                }
            } else {
                currentRow += char;
            }
            i++;
        }
        offset = i;
    }
    return allRecords;
}

const data = {
    announcements: parseInsert('announcements').map(row => ({
        id: row[0],
        title: row[1],
        body: row[2],
        announcement_date: row[3],
        link: row[4],
        created_at: row[5]
    })),
    journals: parseInsert('journals').map(row => ({
        id: row[0],
        user_id: row[1],
        topic: row[2],
        slug: row[3],
        authors: row[4],
        affiliations: row[5],
        published_date: row[6],
        volume: row[7],
        issue: row[8],
        page: row[9],
        abstract: row[10],
        body: row[11],
        pdf_path: row[12],
        citation: row[13],
        doi: row[14],
        keywords: row[15],
        created_at: row[16]
    })),
    publication_certificates: parseInsert('publication_certificates').map(row => ({
        id: row[0],
        recipient_name: row[1],
        designation: row[2],
        institution: row[3],
        book_title: row[4],
        isbn: row[5],
        issn: row[6],
        chapter_title: row[7],
        issue_date: row[8],
        certificate_code: row[9],
        details: row[10],
        created_at: row[11]
    })),
    users: parseInsert('users').map(row => ({
        id: row[0],
        email: row[1],
        password: row[2],
        created_at: row[3]
    }))
};

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log(`✅ Extracted data from SQL to ${outputPath}`);
console.log(`📊 Stats: ${data.announcements.length} Ann, ${data.journals.length} Jour, ${data.publication_certificates.length} Certs, ${data.users.length} Users`);
