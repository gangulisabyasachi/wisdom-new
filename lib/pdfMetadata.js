/**
 * 🤖 GEMINI-POWERED PDF METADATA EXTRACTOR
 * 
 * Sends the PDF directly to Google Gemini API as multimodal input.
 * Far more reliable than regex parsing — handles any journal layout variation.
 * 
 * Requires: GEMINI_API_KEY in .env.local
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const EXTRACTION_PROMPT = `
You are a scholarly metadata extractor. I am giving you a PDF of an academic journal article.
Extract the following fields and return ONLY a valid JSON object, no markdown, no explanation.

Fields to extract:
- topic: The full title of the manuscript (string)
- authors: All author names comma-separated (string)
- affiliations: Author institutional affiliations (string)
- doi: The DOI identifier (e.g. "10.1234/xyz") (string)
- abstract: The full abstract text (string)
- keywords: Keywords comma-separated (string)
- volume: Journal volume number (string)
- issue: Journal issue number (string)
- page: Page range (e.g. "15-27") (string)

If a field is not found, use an empty string "".

Return ONLY this JSON structure:
{
  "topic": "",
  "authors": "",
  "affiliations": "",
  "doi": "",
  "abstract": "",
  "keywords": "",
  "volume": "",
  "issue": "",
  "page": ""
}
`;

export async function getScholarlyMetadata(pdfBuffer) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not found in environment variables.");
    }

    console.log(`[Gemini Extractor] Processing PDF: ${pdfBuffer.length} bytes`);

    const genAI = new GoogleGenerativeAI(apiKey);
    // Explicitly use v1 stable endpoint to avoid v1beta 404 errors
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }, { apiVersion: 'v1' });

    // Convert buffer to base64 for inline sending
    const base64Pdf = pdfBuffer.toString('base64');

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Pdf,
          mimeType: 'application/pdf',
        },
      },
      EXTRACTION_PROMPT,
    ]);

    const rawResponse = result.response.text();
    console.log("[Gemini Extractor] Raw response:", rawResponse.substring(0, 300));

    // Strip any accidental markdown code fences
    const cleaned = rawResponse
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim();

    const metadata = JSON.parse(cleaned);
    console.log("[Gemini Extractor] ✅ Extraction complete. Title:", metadata.topic?.substring(0, 60));

    return metadata;
  } catch (error) {
    console.error("[Gemini Extractor] ❌ Error:", error.message);
    return {
      topic: '', authors: '', affiliations: '', doi: '',
      abstract: '', keywords: '', volume: '', issue: '', page: ''
    };
  }
}
