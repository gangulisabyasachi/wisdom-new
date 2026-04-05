import pdf from 'pdf-parse';

/**
 * Extracts scholarly metadata from a PDF buffer using regex patterns.
 * @param {Buffer} dataBuffer - The PDF file buffer.
 * @returns {Promise<Object>} - Extracted metadata.
 */
export async function getScholarlyMetadata(dataBuffer) {
  try {
    const data = await pdf(dataBuffer);
    const text = data.text;
    
    console.log(`[Parser] Text extracted from PDF. Length: ${text.length} chars.`);
    
    // 1. Extract DOI
    const doiMatch = text.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
    const doi = doiMatch ? doiMatch[0] : '';
    console.log(`[Parser] Found DOI: ${doi || 'None'}`);

    // 2. Extract Abstract
    const abstractMatch = text.match(/(?:Abstract|ABSTRACT)\s*[:.-]?\s*([\s\S]{50,1500}?)(?=\n\s*(?:Keywords|KEYWORDS|Index Terms|Index Terms|Introduction|1\.)|$)/);
    const abstract = abstractMatch ? abstractMatch[1].trim().replace(/\s+/g, ' ') : '';
    console.log(`[Parser] Found Abstract: ${abstract ? 'Yes (Length: ' + abstract.length + ')' : 'No'}`);

    // 3. Extract Keywords
    const keywordsMatch = text.match(/(?:Keywords|KEYWORDS|Index Terms)\s*[:.-]?\s*([\s\S]{5,300}?)(?=\n\s*(?:Introduction|1\.)|$)/);
    const keywords = keywordsMatch ? keywordsMatch[1].trim().replace(/\s+/g, ' ') : '';
    console.log(`[Parser] Found Keywords: ${keywords || 'None'}`);

    // 4. Extract Topic (Title)
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 5);
    let topic = '';
    if (lines.length > 0) {
      const headerPatterns = [/Journal/i, /ISSN/i, /Volume/i, /Issue/i, /http/i, /www/i, /WISDOM/i, /Page \d+/i, /©/i];
      const filteredLines = lines.filter(l => !headerPatterns.some(pattern => pattern.test(l)));
      
      if (filteredLines.length > 0) {
        topic = filteredLines[0];
        if (filteredLines[1] && filteredLines[1].length < 120 && /^[A-Z]/.test(filteredLines[1])) {
           topic += ' ' + filteredLines[1];
        }
      }
    }
    console.log(`[Parser] Found Topic: ${topic || 'None'}`);

    // 5. Extract Authors
    let authors = '';
    if (topic && abstract) {
      const topicIndex = text.indexOf(topic);
      const abstractIndex = text.indexOf('Abstract');
      if (topicIndex !== -1 && abstractIndex !== -1 && abstractIndex > topicIndex) {
        const potentialAuthors = text.substring(topicIndex + topic.length, abstractIndex).trim();
        authors = potentialAuthors.split('\n')[0].trim(); 
      }
    }

    return {
      topic: topic.replace(/\s+/g, ' '),
      authors: authors.replace(/\s+/g, ' '),
      abstract,
      keywords,
      doi,
    };
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    return { topic: '', authors: '', abstract: '', keywords: '', doi: '' };
  }
}
