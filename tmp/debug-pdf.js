import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

console.log("PDF-PARSE EXPORT TYPE:", typeof pdfParse);
console.log("PDF-PARSE EXPORT KEYS:", Object.keys(pdfParse));
if (pdfParse.default) {
    console.log("PDF-PARSE DEFAULT TYPE:", typeof pdfParse.default);
}
