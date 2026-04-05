'use server';

import { getScholarlyMetadata } from '../../../lib/pdfMetadata';

/**
 * Server action to extract metadata from an uploaded PDF.
 * @param {FormData} formData - Contains the 'pdf_file' for parsing.
 * @returns {Promise<Object>} - Extracted metadata as a plain object.
 */
export async function extractManuscriptData(formData) {
  try {
    const file = formData.get('pdf_file');
    if (!file || file.size === 0) {
      throw new Error("No scholarly manuscript file detected.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Perform extraction
    const metadata = await getScholarlyMetadata(buffer);
    
    console.log(`[Magic Extraction] Extracted metadata for: "${metadata.topic}"`);
    return { success: true, data: metadata };
  } catch (error) {
    console.error("Magic Extraction Error:", error);
    return { success: false, error: error.message || "Failed to parse scholarly manuscript." };
  }
}
